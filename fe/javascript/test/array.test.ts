import {
    splice,
    indexOf,
} from '../src/array';

describe('数组方法自实现测试', () => {
    it('splice 数据拼接', () => {
        expect(splice([1, 2, 3, 4, 5], 1, 2, 6, 7, 8)).toEqual([1, 6, 7, 8, 4, 5]);
        expect(splice([1, 2, 3, 4, 5], 1, 1)).toEqual([1, 3, 4, 5]);
    });
});

describe('自实现测试', () => {
    it('indexOf 元素查找', () => {
        expect(indexOf([1, 2, 3, 4, 5], 2)).toBe(1);
        expect(indexOf([1, 2, 3, 4, 5], 2, 2)).toBe(-1);
        expect(indexOf('qwertyuio', 'er')).toBe(2);
        expect(indexOf('qwertyuio', 'er', 3)).toBe(-1);
    })
});
