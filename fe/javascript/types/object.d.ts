/**
 * @description 通用对象映射
 */
declare interface CountMap {
    [propName: string]: number;
};

declare interface typeMap<T> {
    [propName: string]: T;
    [index: number]: T;
}
