export interface MyObject extends MyType1 {
    b: string;
    c: string;
}
export interface MyType1 {
    a: {
        b: {
            c: string;
        };
    };
}
