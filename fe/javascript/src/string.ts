/**
 * @description 字符串相关处理
 * @author nimo 2020-06-05
 */
/**
 * @description normalize 特定字符结构化转换
 * @param {string} str 字符串仅由小写字母和 [] 组成，且字符串不会包含多余的空格。
 * @return 结构化数据
 * eg. 'abc' --> {value: 'abc'}
 *     '[abc[bcd[def]]]' --> {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}
 */
export function normalize(str: string) {
    return str;
}
