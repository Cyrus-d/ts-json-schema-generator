// test 1
export interface MyType1 {
    a: {
        b: {
            c: string;
        };
    };
}
// test 2
export interface MyType2 {
    a: string;
    b: string;
    c: string;
}
// test 3
export interface MyType3 {
    a: MyTypeB;
}

interface MyTypeB {
    b: MyTypeC;
}

interface MyTypeC {
    c: string;
}

// test 4
export interface MyType4 extends MyType1 {
    b: string;
    c: string;
}

// test 5
export type MyType5 = MyType2 & MyType1;

// test 6
export interface MyType6 {
    a: MyType1;
}

// test 7
export interface MyType7 {
    a: MyType71;
    b: string;
    c: string;
}
interface MyType71 {
    b: {
        c: string;
        d: string;
    };
    e: string;
    c: string;
}

// test circular
export interface MyType8 {
    a: MyType81;
    b: MyType8;
    d: {
        e: MyType8;
        c: string;
    };
    c: string;
}
interface MyType81 {
    b: {
        c: string;
        e: MyType8;
    };
    f: MyType8;
    g: string;
    c: string;
}

/* generic */
interface MyGeneric<A, B> {
    b: { c: A };
    c: B;
}

export interface MyObject9 {
    a: MyGeneric<string, number>;
    value2: MyGeneric<number, string>;
}

/* dash test */
export interface MyObject10 {
    "with-dash": string;
    // eslint-disable-next-line prettier/prettier
    without: string;
}

/* readonly */
export interface MyObject11 {
    a: number;
    b: number;
    readonly c: string;
}

/* exclude */

interface Props12 {
    a: number;
    b: number;
    c: number;
}
export type MyObject12 = Pick<Props12, Exclude<keyof Props12, "b">>;

// /* pick */

// interface Props13 {
//     a: number;
//     b: number;
//     c: number;
// }
// export type MyObject13 = Pick<Props13, "a" | "c">;
