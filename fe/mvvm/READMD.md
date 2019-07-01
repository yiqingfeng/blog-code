## 实现一个简易的 MVVM 双向数据绑定

在手写双向数据绑定之前，

所谓双向数据绑定，即视图和数据之间，当一方发生变化时，另一方也会随之变化。

### 实现思路

![](./mvvm.png)


### 具体实现

#### 1. 实现数据监听 `Observer`

利用 `Object.defineProperty` 拦截 `data` 数据变化。

**监听者 observer.js**
```javascript
class Observer {
    constructor(data) {
        this.observer(data);
    }
    observer(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        for (let key in data) {
            this.defineReactive(data, key, data[key]);
            // 深度递归
            this.observer(data[key]);
        }
    }
    /**
     * 定义响应式操作，此处的 value 不可省略，否则直接 get data[key] 会陷入死循环
     * @param  {Object} data 需要进行数据劫持的对象
     * @param  {String} key  需要进行数据劫持的属性
     */
    defineReactive(data, key, value) {
        // 订阅所有变更
        const dep = new Dependence();
        Object.defineProperty(data, key, {
            // 可删除
            configurable: true,
            // 可枚举
            enumerable: true,
            set: (newVal) => {
                if (newVal !== value) {
                    this.observer(newVal);// 避免新值变更为 object 后没有监听
                    value = newVal;
                    // 通知所有订阅者
                    dep.notify();
                }
            },
        });
    }
}
```

**发布者 dependence.js**
```javascript
class Dependence {
    constructor() {
        // 订阅者列表
        this.subs = new Set();
    }
    addSub(sub) {
        this.subs.add(sub);
    }
    removeSub(sub) {
        this.subs.delete(sub);
    }
    // 通知所有订阅者
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        });
    }
}
```

每当 `data` 数据发生变更时，`setter` 拦截器都会通知发布者，从而通知所有相关的订阅者。


#### 2. 实现DOM编译 `Compile`

`Compile` 主要负责模板的解析和初始化页面视图。

由于在解析过程涉及到多次dom元素的操作，为了避免引起页面的多次回流，我们可以利用 `fragment` 文档片段进行处理，处理结束后再将 `fragment` 插入原来的节点中。

**编译者 compiler.js**
```javascript
class Compile {
    constructor(el, vm) {
        this.el = this.getElementNode(el);
        this.vm = vm;
        if (!this.el) {
            return;
        }
        this.render();
    }
    /**
     * ------------------------------------------------------------------------------------------
     * core方法
     * ------------------------------------------------------------------------------------------
     */
    render() {
        // 1、把这些真实的 Dom 移动到内存中，即 fragment（文档碎片）
        const fragment = this.node2fragment(this.el);
        // 2、将模板中的指令中的变量和 {{}} 中的变量替换成真实的数据
        this.compile(fragment);
        // 3、把编译好的 fragment 再塞回页面中
        this.el.appendChild(fragment);
    }
    node2fragment(el) {
        // 创建文档碎片
        const fragment = document.createDocumentFragment();
        // 第一个子节点
        let firstChild;

        // 循环取出根节点中的节点并放入文档碎片中，此时该节点脱离DOM树
        while (firstChild = el.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
    // 解析文档碎片
    compile(fragment) {
        // 获取当前节点的所有子节点，包括文本节点
        const childNodes = Array.from(fragment.childNodes);

        childNodes.forEach(node => {
            if (this.isElementNode(node)) {
                this.compile(node);
                this.compileElement(node);
            } else {
                this.compileText(node);
            }
        });
    }
    compileElement(node) {
        // 获取当前节点的属性
        const attrs = Array.from(node.attributes);

        attrs.forEach(attr => {
            // 判断该元素属性是否为指令
            if (this.isDirective(attr.name)) {
                // 获取指令对应表达式
                let exp = attr.value;
                let [, type] = attr.name.split('-');
                type = `${type}Handle`;
                this[type] && this[type](node, this.vm, exp);
            }
        });
    }
    compileText(node) {
        let exp = node.textContent;
        let reg = /\{\{([^}]+)\}\}/g;
        // 将文本的编译视作默认指令 v-text
        if (reg.test(exp)) {
            this.textHandle(node, this.vm, exp);
        }
    }
    /**
     * ------------------------------------------------------------------------------------------
     * 辅助方法
     * ------------------------------------------------------------------------------------------
     */
    isElementNode(node) {
        return node.nodeType === 1;
    }
    getElementNode(el) {
        return this.isElementNode(el) ?
            el :
            document.querySelector(el);
    }
    // 判断属性是否为指令
    isDirective(name) {
        return name.includes('v-');
    }
    /**
     * ------------------------------------------------------------------------------------------
     * 指令处理
     * ------------------------------------------------------------------------------------------
     */
    modelHandle(node, vm, exp) { // 输入框处理
        const updateFn = (node, value) => {
            node.value = value;
        };
        // 这里应该加一个监控，数据变化了应该调用这个watch的callbak
        new Watcher(vm, exp, (newVal, oldVal) => {
            // 当值变化后会调用callback将新值传递过来()
            updateFn(node, utils.getVal(vm, exp));
        });
        node.addEventListener('input', (e) => {
            let newValue = e.target.value;
            utils.setVal(vm, exp, newValue);
        });
        updateFn(node, utils.getVal(vm, exp));
    }
    textHandle(node, vm, exp) {
        let updateFn = (node, value) => {
            node.textContent = value;
        };
        let value = utils.getTextVal(vm, exp);

        exp.replace(/\{\{([^}]+)\}\}/g, (...arg) => {
            new Watcher(vm, arg[1], (newVal, oldVal) => {
                // 如果数据变化了，文本节点需要重新获取依赖的数据，更新文本中的内容
                updateFn(node, utils.getTextVal(vm, exp));
            });
        })
        updateFn(node, value)
    }
}
```


#### 3. 实现依赖收集 `Observer`