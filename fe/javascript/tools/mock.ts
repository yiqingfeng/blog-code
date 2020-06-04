/**
 * @description mock request 10 次中，成功率接近 15%
 */
export function mockRequest() {
    return new Promise((resolve, reject) => {
        let num: number = Math.round(Math.random() * 10);
        if (num < 2) {
            resolve({
                errCode: 0,
                errMsg: '',
                data: num,
            });
        } else {
            reject({
                errCode: 400,
                errMsg: '请求失败',
            });
        }
    })
}
