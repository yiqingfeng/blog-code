import {
    test
} from '../src/array';

it('测试 test 是否能正常解析结果', () => {
    // expect 断言，判断解析出来的结果是否和 {name:'webyouxuan'}相等
    expect(test(`webyouxuan`)).toEqual({
        name: 'webyouxuan'
    });
})
