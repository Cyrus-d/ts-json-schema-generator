export interface MyType {
    a: HelperA;
    d: HelperA;
}
export interface HelperA {
    b: {
        c: string;
    };
    c: string;
}

// export interface MyType {
//     a: MyType1;
//     b: MyType;
//     e: {
//         f: MyType;
//         g: MyType1;
//         h: string;
//         c: string;
//     };
//     j: string;
//     c: string;
// }
// interface MyType1 {
//     b: {
//         c: string;
//         n: MyType;
//         o: MyType1;
//         d: {
//             e: string;
//         };
//     };
//     k: MyType;
//     l: MyType1;
//     m: string;
//     c: string;
// }

// export interface MyType {
//     // a: MyType1;
//     // b: MyType;
//     e: {
//         f: MyType;
//         g: MyType1;
//         // h: string;
//         // c: string;
//     };
//     // j: string;
//     // c: string;
// }
// interface MyType1 {
//     // b: {
//     //     // c: string;
//     //     // n: MyType;
//     //     o: MyType1;
//     // };
//     // k: MyType;
//     // l: MyType1;
//     // m: string;
//     c: string;
// }

// export interface MyType {
//     // a: MyType1;
//     d: MyType;
//     c: string;
// }

// --------------
// export interface MyType {
//     a: MyType1;
//     f: MyType;
//     // c: MyType1;
//     // b: string;
//     // c: string;
// }
// interface MyType1 {
//     b: {
//         d: MyType1;
//         f: MyType;
//         c: string;
//     };
//     e: string;
//     // c: string;
// }

// --------------

// export interface MyType {
//     a: MyType1;
//     d: MyType;
//     c: string;
// }
// interface MyType1 {
//     b: {
//         c: string;
//         h: MyType1;
//         j: MyType;
//     };
//     e: MyType;
//     f: string;
//     g: MyType1;
//     c: string;
// }

// --------------

// export interface MyType {
//     a: MyType;
//     b: MyType;
//     c: string;
//     d: {
//         e: MyType;
//         c: string;
//         f: {
//             e: MyType;
//             c: string;
//         };
//     };
// }

// --------------

// export interface MyType {
//     a: MyType1;
// }
// interface MyType1 {
//     b: MyType1;
//     c: string;
// }

// --------------

// export interface MyType {
//     a: MyType1;
//     b: MyType1;
// }
// interface MyType1 {
//     b: {
//         c: string;
//     };
// }

//--------------

// export interface MyType {
//     a: MyType1;
//     b: MyType1;
//     d: {
//         e: MyType;
//         c: string;
//         d: {
//             e: MyType;
//             b: MyType1;
//         };
//     };
//     c: string;
// }
// interface MyType1 {
//     b: {
//         c: string;
//         e: MyType;
//     };
//     f: MyType;
//     g: MyType1;
//     c: string;
// }

//--------------------

// export interface MyType {
//   a: MyType1;
// }
// interface MyType1 {
//   g: MyType1;
// }
// export interface MyType {
//     a: MyType1;
//     c: string;
// }
// interface MyType1 {
//     b: {
//         c: string;
//     };
// }

// export interface MyType {
//     a: {
//         b: {
//             c: string;
//         };
//     };
// }

// export interface MyType {
//     a?: MyType;
//     b?: string;
//     c?: MyType;
// }

// export interface MyType {
//     a: MyTypeB;
//     b?: MyType;
//     c: string;
// }

// export interface MyTypeB {
//     b: MyType;
//     c: MyTypeB;
// }

// export interface MyType {
//     a: MyTypeB;
//     // b?: MyType;
// }

// export interface MyTypeB {
//     b: MyTypeC;
// }

// export interface MyTypeC {
//     c: MyType;
// }

// interface MyType1 {
//     b: {
//         c: string;
//         e: MyType;
//     };
//     f: MyType;
//     g: MyType1;
//     c: string;
// }

// export interface MyType {
//     a: MyType1;
//     b: MyType;
//     d: {
//         e: MyType;
//         c: string;
//     };
//     c: string;
// }
// interface MyType1 {
//     b: {
//         c: string;
//         e: MyType;
//     };
//     f: MyType;
//     g: MyType1;
//     c: string;
// }

// /* generic */
// interface MyGeneric<A, B> {
//     b: { c: A };
//     c: B;
// }

// export interface MyObject9 {
//     a: MyGeneric<string, number>;
//     value2: MyGeneric<number, string>;
// }

// /* dash test */
// export interface MyObject10 {
//     "with-dash": string;
//     // eslint-disable-next-line prettier/prettier
//     without: string;
// }

// /* readonly */
// export interface MyObject11 {
//     a: number;
//     b: number;
//     readonly c: string;
// }

// /* exclude */
// interface Props12 {
//     a: number;
//     b: number;
//     c: number;
// }
// export type MyObject12 = Pick<Props12, Exclude<keyof Props12, "b">>;

// /* pick */
// interface Props13 {
//     a: number;
//     c: number;
//     d: number;
// }
// export type MyObject13 = Pick<Props13, "c" | "d">;

// /* pick */
// interface Props14 {
//     a: number;
//     b: number;
//     c: number;
// }
// export type MyObject14 = Omit<Props14, "b">;

// /* test 15 */
// // will not generate anything because of following issus
// //https://github.com/vega/ts-json-schema-generator/issues/192
// export interface MyObject15 {
//     a: number;
//     b: number;
//     d: Omit<MyObject15, "b">;
// }

// /* typeof */

// interface Props17 {
//     a?: {
//         b: {
//             c: string;
//         };
//     };
//     b?: string;
//     c?: string;
//     e?: {
//         a?: {
//             b: {
//                 c: string;
//             };
//         };
//     };
// }

// const obj: Props17 = {};
// export type MyObject17 = typeof obj;

// const obj2: Props17 = { e: {} };
// export type MyObject18 = typeof obj2.e;

// // after
// export type MyObject19 = typeof obj;

// /* extra-props */

// export interface MyObject20 {
//     a: string;
//     [name: string]: string;
// }
// /* conditional typ */

// export type Conditional<T> = T extends undefined ? { b: { c: string } } : { c: string };

// export interface MyObject21 {
//     a: Conditional<undefined>;
//     b: Conditional<string>;
// }

// /* namespace-deep */

// export namespace RootNamespace {
//     export interface Def {
//         a: SubNamespace.HelperA;
//         b: Def;
//         c: Def;
//         d: SubNamespace.HelperA;
//     }

//     namespace SubNamespace {
//         export interface HelperA {
//             c: number;
//             b: {
//                 c: string;
//             };
//         }
//     }
// }
