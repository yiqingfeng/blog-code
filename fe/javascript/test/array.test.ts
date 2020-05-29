import {
    splice,
} from '../src/array';

// test('测试', () => {
//     expect({ name: 'webyouxuan' }).toEqual({ name: 'webyouxuan'});
// });

describe('数组方法自实现测试', () => {
    it('splice 数据拼接', () => {
        expect(splice([1, 2, 3, 4, 5], 1, 2, 6, 7, 8)).toEqual([1, 6, 7, 8, 4, 5]);
    });
});
