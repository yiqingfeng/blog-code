/**
 * @description 990. 等式方程的可满足性
 * @param {string[]} equations
 * @return {boolean}
 * https://leetcode-cn.com/problems/satisfiability-of-equality-equations/
 * 结题思路，并查集 （动态连通性，一边查询一边合并）（kruskal 算法）
 */
class UnionFind {
    // 并查集元素的代表元默认指向自身
    private parent: number[] = Array.from({length: 26}).map((v, i) => i);
    /**
     * @description 并查集查询
     * @param index
     */
    find(index: number): number {
        if (index === this.parent[index]) return index;
        return this.parent[index] = this.find(this.parent[index]);
    }
    /**
     * @description 并查集合并
     * @param index1 {Number}
     * @param index2 {Number}
     */
    unite(index1: number, index2: number): void {
        this.parent[this.find(index1)] = this.find(index2);
    }
}

export function equationsPossible(equations: string[]): boolean {
    const uf = new UnionFind();
    // 该表达式是否相等
    const isEqual = function (str: string): boolean {
        return str[1] === '=';
    };
    const aCharCode = 'a'.charCodeAt(0);
    const getCode = function (str: string): number {
        return str.charCodeAt(0) - aCharCode;
    }
    equations.forEach(str => {
        if (isEqual(str)) {
            uf.unite(getCode(str[0]), getCode(str[3]));
        }
    });
    for (const str of equations) {
        if (isEqual(str)) continue;
        if (uf.find(getCode(str[0])) === uf.find(getCode(str[3]))) {
            return false;
        }
    }
    return true;
}
