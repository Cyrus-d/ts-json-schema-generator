export type MyType = MyElement;

type MyFunction = MyElement | null;

interface MyElement<T extends string | MyFunction = string | MyFunction> {
    type: T;
}
