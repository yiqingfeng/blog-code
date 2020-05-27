import {
    splice,
} from '../src/array';

// it('测试 testConsole 是否能正常解析结果', () => {
//     // expect 断言，判断解析出来的结果是否和 {name:'webyouxuan'}相等
//     expect(testConsole(`webyouxuan`)).toEqual({
//         name: 'webyouxuan'
//     });
// })

// test('测试', () => {
//     expect(testConsole(`webyouxuan`)).toEqual({
//         name: 'webyouxuan'
//     });
// })

// description('测试自实现的方法')

it('测试 splice 是否正确', () => {
    expect(splice([1, 2, 3, 4, 5], 1, 2, 6, 7, 8)).toEqual([1, 6, 7, 8, 4, 5]);
})
