/**
 * @description Promise 小实践
 */

/**
 * @description Promise 重试
 * 成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
 * @param p {Promise}
 * @param retryNum {Number} 重试次数，默认为 5 次
 */
export function retry < T > (fn: Function, maxRetryNum: number = 5): Promise < T > {
    let retryNum = 1;

    function reTryFn(): Promise < T > {
        return new Promise((resolve, reject) => {
            fn()
                .then(data => {
                    resolve(data);
                }, error => {
                    if (retryNum > maxRetryNum) {
                        reject(error);
                        return;
                    }
                    retryNum++;
                    reTryFn()
                        .then(data => {
                            resolve(data);
                        }, error => {
                            reject(error);
                        })
                })
        })
    }
    return reTryFn();
}

function mockApi() {
    return new Promise((resolve, reject) => {
        let num = Math.round(Math.random() * 10);
        if (num < 2) {
            resolve(num);
        } else {
            reject(num);
        }
    })
}

retry(mockApi).then(data => {
    console.log('resolve', data);
}, error => {
    console.error('reject', error);
})
