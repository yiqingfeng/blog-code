import {
    serialize,
    deserialize,
} from '../../leetcode/02';

describe('297. 二叉树的序列化与反序列化', () => {
    it('测试', () => {
        expect(serialize(deserialize('[1,2,3,null,null,4,5]'))).toBe('[1,2,3,null,null,4,5]');
        expect(serialize(deserialize('[]'))).toBe('[]');
        expect(serialize(deserialize('[5,2,3,null,null,2,4,3,1]'))).toBe('[5,2,3,null,null,2,4,3,1]');
        expect(serialize(deserialize('[1,6,2,7,5,null,null,8,null,6,4,7,9,null,null,3,5,null,null,10,8,4,2,null,null,9,11,null,null,1]')))
            .toBe('[1,6,2,7,5,null,null,8,null,6,4,7,9,null,null,3,5,null,null,10,8,4,2,null,null,9,11,null,null,1]');
    });
});
