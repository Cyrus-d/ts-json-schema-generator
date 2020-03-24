export interface MyType {
    a: MyType1;
    b: MyType;
    e: {
        f: MyType;
        g: MyType1;
        h: string;
        c: string;
    };
    j: string;
    c: string;
}
interface MyType1 {
    b: {
        c: string;
        n: MyType;
        o: MyType1;
        d: {
            e: string;
        };
    };
    k: MyType;
    l: MyType1;
    m: string;
    c: string;
}
