export interface MyType extends MyTypeB, MyTypeC {
    a: MyTypeB;
}

export interface MyTypeB {
    b: MyTypeC;
}

export interface MyTypeC {
    c: string;
}
