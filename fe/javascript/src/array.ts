/**
 * @description 数据内置方法自实现
 * @author daiq 2020-05-24
 */
type AnyArray = Array<any>;

/**
 * @description splice 删除修改数据元素
 * array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
 */
export function splice(arr: AnyArray, start: number, deleteCount: number, ...addItems: AnyArray): AnyArray {
    let leftArr: AnyArray = arr.slice(0, start);
    let rightArr: AnyArray = arr.slice(start + deleteCount);

    return leftArr.concat(addItems, rightArr);
}
