/**
 * @description Promise 小实践
 */
type RequestFn < T > = () => Promise < T > ;
/**
 * @description Promise 重试
 * 成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
 * @param p 待执行的异步函数
 * @param retryNum {Number} 重试次数，默认为 5 次
 */
export function retry < T > (fn: RequestFn < T > , maxRetryNum: number = 5): Promise < T > {
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
// 异步函数版
export async function asyncRetry < T > (fn: RequestFn < T > , maxRetryNum: number = 5): Promise < any > {
    let retryNum = maxRetryNum + 1;
    let isSuccess = false; // 是否请求成功

    let res: T;
    do {
        try {
            res = await fn();
            isSuccess = true;
        } catch (error) {
            res = error;
        }
        retryNum--;

    } while (retryNum > 0 && !isSuccess);

    if (isSuccess) {
        return Promise.resolve(res);
    }
    return Promise.reject(res);
}

/**
 * @description 批量请求处理
 * @param requestFns {Array<Function>} 待请求异步函数
 * @param maxNum {Number} 最大并发数
 * @return 所有请求完成后，结果按照请求顺序依次返回（无论是否 reject），所有请求均失败才返回 reject
 */
export function multiRequest < T > (requestFns: Array < RequestFn < T > > , maxNum: number = 5): Promise < Array < T >> {
    return new Promise((resolve, reject) => {
        const tasks: Array < RequestFn < T >> = requestFns.filter(item => !!item); // 函数式编程、不影响元数据
        const queue: Array < Promise < T >> = [];
        const taskResults: Array < T > = [];
        let i = 0;
        let hasSuccess = false;

        const done = function () {
            // 可能存在部分请求未结束
            if (queue.length) return;

            if (hasSuccess) {
                resolve(taskResults);
            } else {
                reject(taskResults);
            }
        };

        const next = function () {
            if (tasks.length < 1) {
                return done();
            }

            let index = i++;
            let request = (tasks.shift() as RequestFn < T > )()
            request
                .then(data => {
                    hasSuccess = true;
                    taskResults[index] = data;
                }, error => {
                    taskResults[index] = error;
                })
                .finally(() => {
                    queue.splice(queue.indexOf(request), 1);
                    next();
                })
            queue.push(request);

            // 未达到最大限制，则继续添加
            if (queue.length < maxNum) {
                next();
            }
        };

        next();
    });
}
