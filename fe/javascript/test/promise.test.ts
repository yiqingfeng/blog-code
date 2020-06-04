/**
 * 异步代码回调测试 https://doc.ebichu.cc/jest/docs/zh-Hans/asynchronous.html
 */

import {
    mockRequest
} from '../tools/mock';

import {
    retry,
    asyncRetry,
    multiRequest,
} from '../src/promise';

describe('异步重试 测试', () => {
    // 测试 retry
    Array.from({
        length: 10
    }).map((v, i) => {
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
    it('multiRequest', () => {
        // expect(1).toBe(1);
        // multiRequest()
        // const requests = Array.from({length: 10}).map((v, i) => {
        //     return
        // });
    });
})
