import {
    equationsPossible,
    translateNum,
    dailyTemperatures,
    threeSum,
    longestCommonPrefix,
} from '../../leetcode/01';

describe('990. 等式方程的可满足性', () => {
    it('测试', () => {
        expect(equationsPossible(["a==b", "b!=a"])).toBeFalsy();
        expect(equationsPossible(["b==a", "a==b"])).toBeTruthy();
        expect(equationsPossible(["a==b", "b==c", "a==c"])).toBeTruthy();
        expect(equationsPossible(["a==b", "b!=c", "c==a"])).not.toBeTruthy();
        expect(equationsPossible(["c==c", "b==d", "x!=z"])).toBeTruthy();
        expect(equationsPossible(["c==c", "f!=a", "f==b", "b==c"])).toBeTruthy();
    });
});

describe('990. 等式方程的可满足性', () => {
    it('测试', () => {
        expect(translateNum(12258)).toBe(5);
        expect(translateNum(11)).toBe(2);
        expect(translateNum(624)).toBe(2);
        expect(translateNum(419605557)).toBe(2);
    });
});

describe('739. 每日温度', () => {
    it('测试', () => {
        expect(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])).toEqual([1, 1, 4, 2, 1, 1, 0, 0]);
    });
});

// describe('15. 三数之和', () => {
//     it('测试', () => {
//         expect(threeSum([-1, 0, 1, 2, -1, -4])).toEqual([1, 1, 4, 2, 1, 1, 0, 0]);
//     });
// });
describe('14. 最长公共前缀', () => {
    it('测试', () => {
        expect(longestCommonPrefix(["flower", "flow", "flight"])).toBe('fl');
        expect(longestCommonPrefix(["dog", "racecar", "car"])).toBe('');
        expect(longestCommonPrefix(["ca", "a"])).toBe('');
    });
});
