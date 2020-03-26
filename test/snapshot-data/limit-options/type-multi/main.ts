export interface MyType1 {
    a: string;
    b: string;
    c: string;
}

export interface MyType2 {
    a: {
        b: {
            c: string;
        };
    };
}

export type MyObject = MyType2 & MyType1;
