/**
 * @description 数据内置方法自实现
 * @author nimo 2020-05-24
 */
type AnyArray = Array < any > ;

/**
 * @description splice 拼接数组元素（修改原数据）
 * @return 返回移除元素列表
 * array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
 */
export function splice(arr: AnyArray, start: number, deleteCount: number, ...addItems: AnyArray): AnyArray {
    let leftArr: AnyArray = arr.slice(0, start);
    let rightArr: AnyArray = arr.slice(start + deleteCount);

    return leftArr.concat(addItems, rightArr);
}

/**
 * @description indexOf 找到一个给定元素的第一个索引，如果不存在，则返回-1
 * array.indexOf(searchElement[, fromIndex])
 * str.indexOf(searchValue [, fromIndex])
 */
export function indexOf(arr: string, item: string, fromIndex ? : number): number;
export function indexOf(arr: Array < any > , item: any, fromIndex ? : number): number;
export function indexOf(arr: any, item: any, fromIndex: number = 0) {
    let index = -1;
    if (typeof arr === 'string') {
        const m = item.length
        for (let i = fromIndex, len = arr.length - m; i < len; i++) {
            if (item === arr.substr(i, m)) {
                index = i;
                break;
            }
        }
    } else if (arr instanceof Array) {
        for (let i = fromIndex, len = arr.length; i < len; i++) {
            if (item === arr[i]) {
                index = i;
                break;
            }
        }
    }
    return index;
}
