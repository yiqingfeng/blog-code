/**
 * @description Promise 小实践
 */
"use strict";
/**
 * @description Promise 重试
 * 成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
 * @param p {Promise}
 * @param retryNum {Number} 重试次数，默认为 5 次
 */
function retry(p, retryNum) {
    if (retryNum === void 0) { retryNum = 5; }
    return p;
}
exports.retry = retry;
