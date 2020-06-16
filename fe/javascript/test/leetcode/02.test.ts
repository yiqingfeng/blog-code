import {
    serialize,
    deserialize,
} from '../../leetcode/02';

describe('297. 二叉树的序列化与反序列化', () => {
    it('测试', () => {
        expect(serialize(deserialize('[1,2,3,null,null,4,5]'))).toBe('[1,2,3,null,null,4,5]');
        expect(serialize(deserialize('[]'))).toBe('[]');
        expect(serialize(deserialize('[5,2,3,null,null,2,4,3,1]'))).toBe('[5,2,3,null,null,2,4,3,1]');
    });
});
