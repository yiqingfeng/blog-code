/**
 * @description MVVM 实例入口
 */
class MVVM {
    constructor(options) {
        // this.el = options.render();
        this.$data = options.data();
        // 数据劫持
        new Observer(this.$data);
        // 数据代理
        this.proxyData(this.$data);
        // 元素存在，则进行挂载
        if (options.el) {
            this.mount(options.el);
        }
    }
    /**
     * 数据代理，方便调用
     * 可通过修改 vm.test 间接修改 vm.$data.test 的值
     * @param  {Object} data vm.$data
     */
    proxyData(data) {
        for (let key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newValue) {
                    data[key] = newValue;
                }
            })
        }
    }
    /**
     * 元素挂载，进行初始化
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    mount(el) {
        new Compile(el, this);
    }
}