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

export type MyType = MyType2 & MyType1;
