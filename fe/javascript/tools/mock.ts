/**
 * @description mock request 10 次中，成功率接近 15%
 * 默认
 */
export function mockRequest(config) {
    config = Object.assign({
        id: 1,
    }, config);
    return new Promise((resolve, reject) => {
        let num: number = Math.round(Math.random() * 100);
        if (num < 2) {
            resolve({
                errCode: 0,
                errMsg: '',
                data: config.id,
            });
        } else {
            reject({
                errCode: 400,
                errMsg: '请求失败',
            });
        }
    })
}
