/**
 * @description 模板编译
 * 利用文档片段的方式处理节点操作，将多次DOM操作，变成一次
 */
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