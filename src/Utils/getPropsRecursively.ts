import { Context } from "../NodeParser";
import { getPropsFromContextRecursively, getPropName, getPropsFromTypeLiteralRecursively } from ".";
import * as ts from "typescript";

export const getPropsRecursively = (node: ts.Node, context: Context) => {
    const propName = getPropName(node);
    if (!propName) return;

    let props: string[] = [];
    const props2 = getPropsFromContextRecursively(context);

    if ([ts.SyntaxKind.TypeLiteral].includes(node.parent.kind)) {
        props = getPropsFromTypeLiteralRecursively(node.parent);
    }
    props = [...props2, ...props];

    props?.push(propName);
    return props;
};
