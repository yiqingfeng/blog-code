/**
 * @description 数据劫持
 */
class Observer {
    constructor(vm, data) {
    	this.vm = vm;
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
    	const dep = new Dependence();
        Object.defineProperty(data, key, {
            // 不允许之后 define
            configurable: false,
            // 可枚举
            enumerable: true,
            set: (newVal) => {
                if (newVal !== value) {
                	this.observer(newVal);
                	value = newVal;
                	// 通知所有订阅者
                	dep.notify();
                }
            },
            get: () => {
            	Dependence.target && dep.addSub(Dependence.target);
                return value;
            }
        });
    }
}