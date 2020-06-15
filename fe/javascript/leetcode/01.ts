/**
 * @description 990. 等式方程的可满足性
 * @param {string[]} equations
 * @return {boolean}
 * https://leetcode-cn.com/problems/satisfiability-of-equality-equations/
 * 结题思路，并查集 （动态连通性，一边查询一边合并）（kruskal 算法）
 */
class UnionFind {
    // 并查集元素的代表元默认指向自身
    private parent: number[] = Array.from({
        length: 26
    }).map((v, i) => i);
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
            // 自左向右
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

/**
 * @description 9. 回文数
 * @param {number} x
 * @return {boolean}
 * https://leetcode-cn.com/problems/palindrome-number/
 */
export function isPalindrome(x: number): boolean {
    /**
     * 不满足回文数的边界
     * 负数 + 大于0且个位为0的整数
     */
    if (x < 0 || (x > 0 && x % 10 === 0)) return false;

    let revertedNum: number = 0;
    while (x > revertedNum) {
        revertedNum = revertedNum * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    return x === revertedNum || x === Math.floor(revertedNum / 10);
};

/**
 * @description 126. 单词接龙 II
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 * https://leetcode-cn.com/problems/word-ladder-ii/
 */
// function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {

// };

/**
 * @description 739. 每日温度
 * @param {number[]} T
 * @return {number[]}
 * https://leetcode-cn.com/problems/daily-temperatures/
 * 解题思路：单调栈
 */
export function dailyTemperatures(T: number[]): number[] {
    const result: number[] = [];
    const len = T.length;
    for (let i = 0; i < len; i++) {
        const temperature = T[i];
        let days = 0;
        for (let j = i + 1; j < len; j++) {
            if (T[j] > temperature) {
                days = j - i;
                break;
            }
        }
        result.push(days);
    }

    return result;
}

/**
 * 15. 三数之和
 * @param nums {number[]} 整数数组
 * @return number[][] 满足条件不重复的三元组
 * https://leetcode-cn.com/problems/3sum/
 * 解题思路：双指针 => 左向右移动、右向左移动
 */
export function threeSum(nums: number[]): number[][] {
    const result: number[][] = [];
    const list = nums.sort((a, b) => a - b); // 由小到大重排
    const maxLen = list.length - 2;

    for (let i = 0; i < maxLen; i++) {
        let left = i + 1;
        let right = maxLen - 1;
        while (left < right) {
            // 数量偏小（左指针右移）
            if (list[i] + list[left] + list[right] < 0) {
                left++;
                continue;
            }
            // 数量过大
            if (list[i] + list[left] + list[right] > 0) {
                right--;
                continue;
            }

            // 左指针与下一数字不重复时，导出结果
            if (left + 1 !== right && list[left + 1] !== list[left]) {
                result.push([list[i], list[left], list[right]])
            }
            left++;
        }
    }

    return result;
}

/**
 * @description 14. 最长公共前缀
 * @param {Array<string>} strs 指定字符串数组
 * @returns {string} 最长公共前缀
 * https://leetcode-cn.com/problems/longest-common-prefix/
 * 解题思路：水平扫描法（求公共前缀最大长度）
 */
export function longestCommonPrefix(strs: string[]): string {
    const ans = strs[0];
    if (strs.length < 2) return ans || '';

    function getMaxPrefixLength(max: number, str: string): number {
        let j = 0;
        while(j < max && j < str.length) {
            if (str[j] !== ans[j]) {
                break;
            }
            j++;
        }
        return j;
    }

    let maxLen: number = ans.length;
    for(let i = 1; i < strs.length; i++) {
        maxLen = getMaxPrefixLength(maxLen, strs[i]);
        if (maxLen === 0) break;
    }
    return ans.slice(0, maxLen);
}

// 处理处理为寻找最大公共子串了 =_=||
/**
export function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return '';
    if (strs.length === 1) return strs[0];

    let minStr: string = strs[0];
    strs.forEach(str => {
        if (minStr.length > str.length) {
            minStr = str;
        }
    });

    // 判断当前字符串是否均存在字符串数组中
    function isIncludedStr(str: string): boolean {
        let isIncluded: boolean = true;
        for (let i = 0; i < strs.length; i++) {
            if (strs[i].indexOf(str) === -1) {
                isIncluded = false;
                break;
            }
        }
        return isIncluded;
    }

    let result = '';
    let i = 0;
    let j = 0;
    while (j <= minStr.length) {
        let str: string;
        str = minStr.substr(i, j)
        if (isIncludedStr(str)) {
            j++;
            if (str.length > result.length) {
                result = str;
            }
        } else {
            i++;
            if (i > j) {
                j = i;
            }
        }
    }

    return result;
}
*/

