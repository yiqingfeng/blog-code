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
            // 移除该无效层级 i - 1
            list.length = i - 1;
            return;
        }
    }
    setChildren(list[0], 1);

    let resultList: Array < string > = [];
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
    const rootNode: treeNode  = createNode(nodeData.splice(0, 1));
    // 设置子节点树
    function setChildren(nodes: treeNode[], level: number = 1) {
        if (nodes.length === 0 || nodeData.length === 0) return;

        const nums: number = 2 ** level;
        const curtLevelNodeData = nodeData.splice(0, nums);

        let children: treeNode[] = [];
        nodes.forEach((node, index) => {
            // 父节点不存在
            if (node === null) {
                children.push(null, null);
                return;
            }
            const left: treeNode = createNode(curtLevelNodeData[index * 2]);
            const right: treeNode = createNode(curtLevelNodeData[index * 2 + 1]);
            children.push(left, right);
            node.left = left;
            node.right = right;
        });
        // 不存在更深层级
        if (curtLevelNodeData.length < nums) {
            children = [];
        }
        setChildren(children, level + 1);
    }
    setChildren([rootNode]);
    return rootNode;
}
