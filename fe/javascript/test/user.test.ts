/**
 * @description 异步函数测试
 */
// jest.mock('../__mocks__/request');

// import * as user from '../src/user';

// //断言必须返回一个primose
// it('works with promises', () => {
//     expect.assertions(1);
//     return user.getUserName(1).then(data => expect(data).toEqual('Alex'));
// });

test('测试', () => {
    expect({
        name: 'webyouxuan'
    }).toEqual({
        name: 'webyouxuan'
    });
});
