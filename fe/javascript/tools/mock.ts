/**
 * @description mock request 10 次中，成功率接近 15%
 * 默认
 */
interface requestConfig {
    id: number;
    successRate: number;
}

interface responseData {
    errCode: number | string;
    errMsg: string;
    data ? : any;
}

export function mockRequest(): Promise < responseData > ;
export function mockRequest(config: requestConfig): Promise < responseData > ;
export function mockRequest(config ? : requestConfig): Promise < responseData > {
    const options: requestConfig = Object.assign({
        id: 1,
        successRate: 15,
    }, config);
    return new Promise((resolve, reject) => {
        let num: number = Math.round(Math.random() * 100);
        if (num <= options.successRate) {
            resolve({
                errCode: 0,
                errMsg: '请求成功',
                data: options.id,
            });
        } else {
            reject({
                errCode: 500,
                errMsg: '请求失败',
            });
        }
    })
}
