import { Context } from "../NodeParser";
import { getPropsFromParentContextRecursively, getAnyNodeName, getPropsFromTypeLiteralRecursively } from ".";
import * as ts from "typescript";
import { LiteralType } from "../Type/LiteralType";

export const getPropsRecursively = (node: ts.Node | LiteralType, context: Context) => {
    const propName = getAnyNodeName(node);

    let props: string[];
    if (
        node instanceof LiteralType ||
        ((ts.isInterfaceDeclaration(node.parent) || ts.isUnionTypeNode(node.parent)) &&
            !context.hasParentContextRecreance())
    ) {
        props = getPropsFromTypeLiteralRecursively(context.getReference());
    } else {
        props = ts.isEnumMember(node) ? [] : getPropsFromParentContextRecursively(context);

        if (
            // !context.hasOperator("typeof") &&
            [ts.SyntaxKind.TypeLiteral, ts.SyntaxKind.EnumDeclaration].includes(node.parent.kind)
        ) {
            const parentNode = ts.isEnumMember(node) ? context.getReference() : node.parent;
            if (parentNode) {
                const nodeParentProps = getPropsFromTypeLiteralRecursively(parentNode, context.getSkipNode());
                props = [...props, ...nodeParentProps];
            }
        }
    }
    if (propName) props?.push(propName);
    return props;
};
