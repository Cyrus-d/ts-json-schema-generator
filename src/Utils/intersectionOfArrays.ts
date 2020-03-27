import * as stringify from "json-stable-stringify";

<<<<<<< HEAD
export function intersectionOfArrays<T>(a: readonly T[], b: readonly T[]): T[] {
=======
export function intersectionOfArrays<T>(a: T[], b: T[]): T[] {
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
    const output: T[] = [];
    const inA: Set<string> = new Set(a.map((item: T) => stringify(item)));
    for (const value of b) {
        if (inA.has(stringify(value))) {
            output.push(value);
        }
    }
    return output;
}
