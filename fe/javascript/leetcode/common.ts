/**
 * @description 快排 - 分而治之
 */
export function quickSort(nums: number[]): number[] {
    if (nums.length < 2) return nums;

    const base = nums[0];
    const left: number[] = [];
    const right: number[] = [];
    for (let i = 1; i < nums.length; i++) {
        if (base > nums[i]) {
            left.push(nums[i]);
        } else {
            right.push(nums[i])
        }
    }
    return quickSort(left).concat(base, quickSort(right));
}

/**
 * @description 栈
 */
export class Stack<T> {
    protected _data: T[];
    constructor() {
        this._data = [];
    }
    isEmpty(): boolean {
        return this._data.length === 0;
    }
    append(value: T) {
        this._data.push(value);
    }
    pop(): T | undefined {
        return this._data.pop();
    }
}
