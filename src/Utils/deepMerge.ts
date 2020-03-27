<<<<<<< HEAD
import { intersectionOfArrays } from "./intersectionOfArrays";

export function deepMerge<T>(a: Partial<T>, b: Partial<T>, intersectArrays: boolean): T;
export function deepMerge<A, B>(a: A, b: B, intersectArrays: boolean): (A & B) | B;

=======
import { JSONSchema7Definition } from "json-schema";
import { Definition } from "./../Schema/Definition";
import { intersectionOfArrays } from "./intersectionOfArrays";

>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
/**
 * Merges nested objects and arrays.
 *
 * @param a - lhs to merge.
 * @param b - rhs to merge.
 * @param intersectArrays - compute intersection of arrays (otherwise take the array from b).
 * @returns a and b merged together.
 */
<<<<<<< HEAD
export function deepMerge(a: any, b: any, intersectArrays: boolean): any {
    const typeA = typeof a;
    const typeB = typeof b;
    if (typeA === typeB && typeA === "object" && typeA !== null && a !== b) {
        const isArrayA = Array.isArray(a);
        const isArrayB = Array.isArray(b);
        // If they are both arrays just concatenate them.
        if (isArrayA && isArrayB) {
            if (intersectArrays) {
                return intersectionOfArrays(a, b);
            } else {
                return b;
            }
        } else if ((isArrayA && !isArrayB) || (!isArrayA && isArrayB)) {
            return b;
        } else {
            // make a shallow copy of a.
            const output = Object.assign({}, a);
            // deep merge all properties in both.
            for (const key in output) {
                if (b.hasOwnProperty(key)) {
                    output[key] = deepMerge(a[key], b[key], intersectArrays);
                }
            }
            // add properties from b that are not in a.
            for (const key in b) {
                if (!a.hasOwnProperty(key)) {
                    output[key] = b[key];
                }
            }

            if ("$ref" in output && ("allOf" in output || "anyOf" in output)) {
                delete output.$ref;
            }

            return output;
        }
    }
    // by default return b for non mergable types.
    return b;
=======
export function deepMerge(
    a: {
        [key: string]: JSONSchema7Definition;
    },
    b: {
        [key: string]: JSONSchema7Definition;
    }
) {
    const output = { ...a, ...b };

    for (const key in a) {
        if (b.hasOwnProperty(key)) {
            const elementA = a[key as keyof Definition];
            const elementB = b[key as keyof Definition];

            if (
                elementA != null &&
                elementB != null &&
                typeof elementA === "object" &&
                typeof elementB === "object" &&
                "type" in elementA &&
                "type" in elementB
            ) {
                if (elementA.type == elementB.type) {
                    if (elementA.enum == null && elementB.enum != null) {
                        (output as any)[key].enum = elementB.enum;
                    } else if (elementA.enum != null && elementB.enum == null) {
                        (output as any)[key].enum = elementA.enum;
                    } else if (elementA.enum != null && elementB.enum != null) {
                        (output as any)[key].enum = intersectionOfArrays(
                            elementA.enum as any[],
                            elementB.enum as any[]
                        );
                    }
                }
            }
        }
    }

    return output;
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
}
