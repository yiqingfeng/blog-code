/**
 * @description Promise 小实践
 */
/**
 * @description Promise 重试
 * 成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
 * @param p 待执行的异步函数
 * @param retryNum {Number} 重试次数，默认为 5 次
 */
export function retry < T > (fn: Function, maxRetryNum: number = 5): Promise < T > {
    let retryNum = 1;

    function reTryFn(): Promise < T > {
        return new Promise((resolve, reject) => {
            fn()
                .then((data: T) => {
                    resolve(data);
                }, (error: any) => {
                    if (retryNum > maxRetryNum) {
                        reject(error);
                        return;
                    }
                    retryNum++;
                    reTryFn()
                        .then((data: T) => {
                            resolve(data);
                        }, (error: any) => {
                            reject(error);
                        })
                })
        })
    }
    return reTryFn();
}

/**
 * @description 批量请求处理
 * @param requestFns {Array<Function>} 待请求异步函数
 * @param maxNum {Number} 最大并发数
 * @return 所有请求完成后，结果按照请求顺序依次返回
 */
export async function multiRequest(requestFns: Array < Function > , maxNum: number = 5) {
    const taskResults = [];
    const queue = [];
    let i = 0;

    const next = async function () {
        if (requestFns.length < 1) return Promise.resolve();

        let index = i++;
        const request = (requestFns.shift())()
            .then(data => {
                taskResults[index] = data;
                next();
            }, error => {
                next();
            })
        queue.push(request);

        // 未达到最大限制，则继续添加
        if (queue.length < maxNum) {
            next();
        }
    };

    await next();

    return taskResults;
}
