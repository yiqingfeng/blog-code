/**
 * @description 数据依赖容器（主题）（发布者）
 * 通过发布订阅模式，将数据变动通知给订阅者（subscription）
 */
class Dependence {
    constructor() {
        // 订阅者列表
        this.subs = new Set();
    }
    /**
     * 添加订阅者，利用 set 避免重复
     * @param {[type]} sub [description]
     */
    addSub(sub) {
        this.subs.add(sub);
        return this;
    }
    removeSub(sub) {
        // 该订阅者存在是 delete 返回 true 否则返回 false
        this.subs.delete(sub);
        return this;
    }
    // 通知所有订阅者
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        });
    }
}