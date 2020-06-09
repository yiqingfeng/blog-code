/**
 * @description 990. 等式方程的可满足性
 * @param {string[]} equations
 * @return {boolean}
 * https://leetcode-cn.com/problems/satisfiability-of-equality-equations/
 * 结题思路，并查集 （动态连通性，一边查询一边合并）（kruskal 算法）
 */
class UnionFind {
    // 并查集元素的代表元默认指向自身
    private parent: number[] = Array.from({ length: 26 }).map((v, i) => i);
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

/**
 * @description 46. 把数字翻译成字符串
 * @param {number} num
 * @return {number}
 * https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/
 * 结题思路：动态规划
 */
export function translateNum(num: number): number {
    const translateMaps: CountMap = {};
    const translate = function (num: number | string): number {
        num = Number(num);
        if (num < 10) return 1;

        if (translateMaps[num]) return translateMaps[num];

        if (num < 100) {
            translateMaps[num] = num > 25 ? 1 : 2;
        } else {
            let str = String(num);
            let right: string = str.slice(2);
            if (Number(str.slice(0, 2)) > 25) {
                translateMaps[num] = translate(str.slice(1));
            } else {
                translateMaps[num] = translate(right) + translate(str.slice(1));
            }
        }
        return translateMaps[num];
    }
    return translate(num);
}
