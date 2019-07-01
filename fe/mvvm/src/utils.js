const utils = {
    getVal(vm, expr) {
    	// 目前仅支持简单的表达式 a.b.c
        expr = expr.split('.')
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    },
    getTextVal(vm, expr) {
        return expr.replace(/\{\{([^}]+)\}\}/g, (...arg) => {
            return this.getVal(vm, arg[1])
        })
    },
    setVal(vm, expr, value) {
        expr = expr.split('.')
        return expr.reduce((prev, next, currentIndex) => {
            if (currentIndex === expr.length - 1) {
                return prev[next] = value;
            }
            return prev[next];
        }, vm.$data);
    },
};