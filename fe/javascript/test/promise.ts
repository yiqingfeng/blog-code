import {
    retry
} from '../src/promise';

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

describe('Promise方法 测试', () => {
    it('retry 错误重试', () => {
        Array(10).map((v) => {
            const mockCallback = jest.fn();
            retry(async function () {
                mockCallback();
                return mockApi();
            });
            // 此 mock 函数被调用了两次
            expect(mockCallback.mock.calls.length).toBeLessThanOrEqual(2);
        })
    });
});
