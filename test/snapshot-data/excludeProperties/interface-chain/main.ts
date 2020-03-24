export interface MyType {
    a: MyType1;
    b: string;
    c: string;
}
interface MyType1 {
    b: {
        c: string;
        d: string;
    };
    e: string;
    c: string;
}
