import * as ts from "typescript";

export const isTopLevelDeclarations = (node: ts.Node) => {
    switch (node.kind) {
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.VariableStatement:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.ModuleDeclaration:
            return true;
        default:
            return false;
    }
};
export const findTopLevelDeclarations = (node: ts.Node): ts.Node | undefined => {
    if (isTopLevelDeclarations(node)) return node;
    if (node.parent) {
        return findTopLevelDeclarations(node.parent);
    }
    return undefined;
};
