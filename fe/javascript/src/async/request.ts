/**
 * @description 请求处理
 */
const http = require('http');

interface httpResponse {
    on: Function;
}

export default function request(url: string) {
    return new Promise(resolve => {
        // 这是一个HTTP请求的例子, 用来从API获取用户信息
        // This module is being mocked in __mocks__/request.js
        http.get({
            path: url
        }, (response: httpResponse) => {
            let data: string = '';
            response.on('data', (_data: string) => (data += _data));
            response.on('end', () => resolve(data));
        });
    });
}
