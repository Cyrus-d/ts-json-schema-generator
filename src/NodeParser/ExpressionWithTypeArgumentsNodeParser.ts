import * as ts from "typescript";
import { Context, NodeParser } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { BaseType } from "../Type/BaseType";

export class ExpressionWithTypeArgumentsNodeParser implements SubNodeParser {
    public constructor(private typeChecker: ts.TypeChecker, private childNodeParser: NodeParser) {}

    public supportsNode(node: ts.ExpressionWithTypeArguments): boolean {
        return node.kind === ts.SyntaxKind.ExpressionWithTypeArguments;
    }
    public createType(node: ts.ExpressionWithTypeArguments, context: Context): BaseType | undefined {
        const typeSymbol = this.typeChecker.getSymbolAtLocation(node.expression)!;
        if (typeSymbol.flags & ts.SymbolFlags.Alias) {
            const aliasedSymbol = this.typeChecker.getAliasedSymbol(typeSymbol);
            return this.childNodeParser.createType(
                aliasedSymbol.declarations![0],
                this.createSubContext(node, context)
            );
        } else if (typeSymbol.flags & ts.SymbolFlags.TypeParameter) {
            return context.getArgument(typeSymbol.name);
<<<<<<< HEAD
        } else if (typeSymbol.declarations) {
=======
        } else {
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
            return this.childNodeParser.createType(typeSymbol.declarations![0], this.createSubContext(node, context));
        }
        return;
    }

    private createSubContext(node: ts.ExpressionWithTypeArguments, parentContext: Context): Context {
<<<<<<< HEAD
        const subContext = new Context(node, parentContext);
        if (node.typeArguments?.length) {
            node.typeArguments.forEach(typeArg => {
=======
        const subContext = new Context(node);
        if (node.typeArguments?.length) {
            node.typeArguments.forEach((typeArg) => {
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
                const type = this.childNodeParser.createType(typeArg, parentContext);
                subContext.pushArgument(type);
            });
        }
        return subContext;
    }
}
