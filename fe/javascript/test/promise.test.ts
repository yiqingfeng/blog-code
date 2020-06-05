/**
 * 异步代码回调测试 https://doc.ebichu.cc/jest/docs/zh-Hans/asynchronous.html
 */
import {
    retry,
    asyncRetry,
    multiRequest,
} from '../src/promise';

import tools from '../tools/index';

let {
    mockRequest,
    loopCall,
} = tools;

describe('异步重试 测试', () => {
    // 测试 retry
    loopCall(function (i) {
        const retryNum = i;
        it(`retry 错误重试 ${retryNum} 次`, done => {
            const mockCallback = jest.fn();
            retry(async function () {
                    mockCallback();
                    return mockRequest();
                }, retryNum)
                .then(() => {
                    // 此 mock 函数被调用了两次
                    expect(mockCallback.mock.calls.length).toBeLessThanOrEqual(retryNum + 1);
                    done();
                }, () => {
                    expect(mockCallback.mock.calls.length).toBe(retryNum + 1);
                    done();
                })
            // 此处使用 finally 执行 done，效果等价于 先执行 done 后执行 expect 校验
        });

        it(`asyncRetry 错误重试 ${retryNum} 次`, function () {
            const mockCallback = jest.fn();
            return asyncRetry(async function () {
                    mockCallback();
                    return mockRequest();
                }, retryNum)
                .then(() => {
                    // 此 mock 函数被调用了两次
                    expect(mockCallback.mock.calls.length).toBeLessThanOrEqual(retryNum + 1);
                }, () => {
                    expect(mockCallback.mock.calls.length).toBe(retryNum + 1);
                })
        });
    });
});

describe('多请求并发限制 测试', () => {
    it('multiRequest 均成功', () => {
        expect.assertions(1);
        const requests = loopCall(function(i) {
            return async function () {
                return await mockRequest({
                    id: i + 1,
                    successRate: 100,
                });
            };
        });
        return expect(multiRequest(requests, 3).then(list => list.map(item => item.data)))
            .resolves.toEqual(Array.from({
                length: 10
            }).map((v, i) => i + 1))
    });

    it('multiRequest 均失败', () => {
        expect.assertions(1);
        const requests = loopCall(function(i) {
            return async function () {
                return await mockRequest({
                    id: i + 1,
                    successRate: 0,
                });
            };
        });
        /**
         * 注意：一个 rejected 状态的 promise 后如果执行了 then 或 catch ，则返回一个 resolved Promise
         * eg. let a = new Promise((resolve, reject) => reject(1)) // a: Promise {<rejected>: 1}
         *     let a = new Promise((resolve, reject) => reject(1)).then(i => 2, i => 3) // a: Promise {<resolved>: 3}
         *     let a = new Promise((resolve, reject) => reject(1)).catch(i => 4) // a: Promise {<resolved>: 4}
         *     let a = new Promise((resolve, reject) => reject(1)).catch(i => Promise.reject(5)) // a: Promise {<resolved>: 5}
         *
         * 因此本例的另一种写法就是：
         * return expect(multiRequest(requests, 3).catch(list => Promise.reject(list.map(i => i.errCode))))
         *      .rejects.toEqual(Array.from({length: 10}).map(() => 500))
         */
        // 另一种写法为
        return expect(multiRequest(requests, 3))
            .rejects.toEqual(Array.from({
                length: 10
            }).map((v, i) => {
                return {
                    errCode: 500,
                    errMsg: '请求失败',
                };
            }))
    });
})
