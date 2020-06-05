/**
 * @description 循环
 */
/**
 * @description 执行回调指定次数
 */
export function loopCall<T>(fn: (i: number) => T, callNum: number = 10): Array<T> {
    return Array.from({
        length: callNum,
    }).map((v, i) => fn(i))
}
