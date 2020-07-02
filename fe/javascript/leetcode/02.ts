import { Stack } from './common';
/**
 * @description 297. 二叉树的序列化与反序列化
 * https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/
 */
interface TreeNodeInterface {
    val: any;
    left: TreeNodeInterface | null;
    right: TreeNodeInterface | null;
}
type treeNode = TreeNodeInterface | null;

export class TreeNode implements TreeNodeInterface {
    val: any;
    left = null;
    right = null;
    constructor(val: any) {
        this.val = val;
    }
}

/**
 * @description 二叉树序列化
 * @param {TreeNodeInterface} root
 */
export function serialize(root: treeNode = null): string {
    // 边界情况处理
    if (!root) return '[]';

    const list: treeNode[][] = [
        [root]
    ];

    function setChildren(nodes: treeNode[], i: number) {
        const children: treeNode[] = [];
        nodes.forEach(item => {
            if (item === null) return;

            children.push(item.left, item.right);
        });
        // 存在有效子层级
        if (children.length !== 0) {
            list[i] = children;
            setChildren(children, ++i);
        } else {
            // 移除全是 null 的无效层级 i - 1
            list.length = i - 1;
            return;
        }
    }
    setChildren(list[0], 1);

    let resultList: Array<string> = [];
    list.forEach(item => {
        resultList = resultList.concat(item.map(i => i === null ? 'null' : i.val))
    });

    // 移除后面无效的 null
    let validNum: number = resultList.length - 1;
    for (; validNum > 0; validNum--) {
        if (resultList[validNum] !== 'null') break;
    }
    resultList.length = validNum + 1;

    return `[${resultList.join(',')}]`;
}

/**
 * @description 二叉树反序列化 (目前暂时理解为符合条件的 val 类型为 number | string)
 * @param {string} data
 */
export function deserialize(data: string): treeNode {
    // 无根节点边界处理
    if (data.length < 3) return null;

    const nodeData: (number | null)[] = data
        .substr(1, data.length - 2)
        .split(',')
        .map(item => {
            if (item === 'null') return null;
            return Number(item);
        })

    function createNode(data: any): treeNode {
        if (data === null || data === undefined) return null;
        return new TreeNode(data);
    }
    const rootNode: treeNode = createNode(nodeData.splice(0, 1));
    // 设置子节点树
    function setChildren(nodes: treeNode[], level: number = 1) {
        const nNodes: TreeNodeInterface[] = nodes.filter(node => node) as TreeNodeInterface[];
        if (nNodes.length === 0 || nodeData.length === 0) return;

        const nums: number = 2 * nNodes.length;
        const curtLevelNodeData = nodeData.splice(0, nums);

        let children: treeNode[] = [];
        nNodes.forEach((node, index) => {
            // 父节点不存在
            // if (node === null) {
            //     children.push(null, null);
            //     return;
            // }
            const left: treeNode = createNode(curtLevelNodeData.shift());
            const right: treeNode = createNode(curtLevelNodeData.shift());
            children.push(left, right);
            node.left = left;
            node.right = right;
        });
        setChildren(children, level + 1);
    }
    setChildren([rootNode]);
    return rootNode;
}

/**
 * @description 215. 数组中的第K个最大元素
 * https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
 */
export function findKthLargest(nums: number[], k: number): number {
    let list: number[]; // 由大到小，重新排序

    list = nums.sort((a, b) => b - a);

    return list[k - 1];
}


/**
 * @description 剑指 Offer 09. 用两个栈实现队列
 * https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/
 * 解题思路：利用第二个栈倒叙记录整体队列信息
 */
class CQueue {
    protected _stack1: Stack<number>;
    protected _stack2: Stack<number>;
    constructor() {
        this._stack1 = new Stack();
        this._stack2 = new Stack();
    }

    appendTail(value: number): void {
        this._stack1.append(value);
    }

    deleteHead(): number {
        if (!this._stack2.isEmpty()) return this._stack2.pop() as number;
        if (this._stack1.isEmpty()) return -1;

        while(!this._stack1.isEmpty()) {
            this._stack2.append(this._stack1.pop() as number);
        }
        return this._stack2.pop() as number;
    }
}
// 简化版
class StackEasy {
    protected _stack1: number[];
    protected _stack2: number[];
    constructor() {
        this._stack1 = [];
        this._stack2 = [];
    }
    appendTail(value: number): void {
        this._stack1.push(value);
    }
    deleteHead(): number {
        if (this._stack2.length > 0) return this._stack2.pop() as number;
        if (this._stack1.length === 0) return -1;

        while(this._stack1.length > 0) {
            this._stack2.push(this._stack1.pop() as number);
        }
        return this._stack2.pop() as number;
    }
}


/**
 * @description 718. 最长重复子数组
 * https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/
 * 类比： 最长重复子串
 * 解题思路：滑动窗口(找寻重叠区域最大重复值)
 */
function findLength(A: number[], B: number[]): number {
    function maxLength(a: number, b: number, len: number): number {
        let ans = 0;
        let max = 0;
        for (let i = 0; i < len; i++) {
            if (A[a + i] === B[b + i]) {
                ans++;
            } else {
                ans = 0;
            }
            max = Math.max(max, ans);
        }
        return max;
    }

    let max = 0;
    const m = A.length;
    const n = B.length;
    for(let i = 0; i < m; i++) {
        max = Math.max(max, maxLength(i, 0, Math.max(n, m - i)));
    }
    for(let i = 0; i < n; i++) {
        max = Math.max(max, maxLength(0, i, Math.max(m, n - i)));
    }

    return max;
};

/**
 * @description 378. 有序矩阵中第K小的元素
 * https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix/
 */
function kthSmallest(matrix: number[][], k: number): number {
    let list: number[] = [];
    for(let i = 0; i < matrix.length; i++) {
        list = list.concat(matrix[i])
    }
    list = list.sort((a, b) => a - b);
    return list[k - 1];
};

/*
 * @description 1014. 最佳观光组合
 * @param {Array} A 正整数数组
 * @return {number} 最高分
 * https://leetcode-cn.com/problems/best-sightseeing-pair/submissions/
 * 解题思路：枚举 => 优化点：拆分（A[i] + i） + (A[j] - j) j 固定是，只求前一部分最大值即可
 */
export function maxScoreSightseeingPair(A: number[]): number {
    // 未优化前
    /*
    let distance: number = 0;
    for (let i = 0; i < A.length; i++) {
        for (let j = i + 1; j < A.length; j++) {
            let scores: number = A[i] + A[j] + i - j;
            if (scores > distance) {
                distance = scores;
            }
        }
    }
    return distance;
    */
    // 优化后
    let ans: number = 0;
    let maxI: number = A[0];
    for(let j = 1; j < A.length; j++) {
        ans = Math.max(ans, maxI + A[j] - j);
        maxI = Math.max(maxI, A[j] + j);
    }
    return ans;
}
