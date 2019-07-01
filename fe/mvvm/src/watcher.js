/**
 * @description 数据变更订阅者
 * @param {String} exp 原始表达式
 * @param {[type]} [varname] [description]
 */
class Watcher {
	constructor(vm, exp, callback) {
		this.vm = vm;
		this.exp = exp;
		// 存储生成编译结果的函数
		this.callback = callback;
		// 存储当前编译结果
		this.value = this.get();
	}
	get() {
		// 通过触发该数据的getter函数，将watch添加到dep中
		Dependence.target = this;
		const value = utils.getVal(this.vm, this.exp);
		Dependence.target = null;
		return value;
	}
	update() {
		const newVal = this.get();
		const oldVal = this.value;
		if (oldVal !== newVal) {
			this.value = newVal;
			this.callback && this.callback(newVal, oldVal)
		}
	}
}