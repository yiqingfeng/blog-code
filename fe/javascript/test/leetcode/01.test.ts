import {
    equationsPossible,
    translateNum,
} from '../../leetcode/01';

describe('990. 等式方程的可满足性', () => {
    it('测试', () => {
        expect(equationsPossible(["a==b","b!=a"])).toBeFalsy();
        expect(equationsPossible(["b==a","a==b"])).toBeTruthy();
        expect(equationsPossible(["a==b","b==c","a==c"])).toBeTruthy();
        expect(equationsPossible(["a==b","b!=c","c==a"])).not.toBeTruthy();
        expect(equationsPossible(["c==c","b==d","x!=z"])).toBeTruthy();
        expect(equationsPossible(["c==c","f!=a","f==b","b==c"])).toBeTruthy();
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
