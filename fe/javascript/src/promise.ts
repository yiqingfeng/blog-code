/**
 * @description Promise 小实践
 */
type RequestFn = () => Promise < any > ;
/**
 * @description Promise 重试
 * 成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
 * @param p 待执行的异步函数
 * @param retryNum {Number} 重试次数，默认为 5 次
 */
export function retry < T > (fn: RequestFn, maxRetryNum: number = 5): Promise < T > {
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
export async function asyncRetry (fn: RequestFn, maxRetryNum: number = 5): Promise < any > {
    let retryNum = maxRetryNum + 1;
    let isSuccess = false; // 是否请求成功

    let res;
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
 * @return 所有请求完成后，结果按照请求顺序依次返回
 */
export async function multiRequest < T > (requestFns: Array < RequestFn > , maxNum: number = 5): Promise < Array < T >> {
    const taskResults: Array < T > = [];
    const queue: Array < Promise < any >> = [];
    let i = 0;

    const next = async function () {
        if (requestFns.length < 1) return Promise.resolve();

        let index = i++;
        let request = (requestFns.shift() as RequestFn)()
        request.then(data => {
            taskResults[index] = data;
            queue.splice(queue.indexOf(request), 1);
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
