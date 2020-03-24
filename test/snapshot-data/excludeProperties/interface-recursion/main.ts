export interface MyType {
    a: MyType;
    b: MyType;
    c: string;
    d: {
        e: MyType;
        c: string;
        f: {
            e: MyType;
            c: string;
        };
    };
}
