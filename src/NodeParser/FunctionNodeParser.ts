import * as ts from "typescript";
import { Context, NodeParser } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { BaseType } from "../Type/BaseType";
import { FunctionParameter, FunctionType } from "../Type/FunctionType";
import { isHidden, symbolAtNode } from "../Utils";
import { UnknownType } from "../Type/UnknownType";

export class FunctionNodeParser implements SubNodeParser {
    public constructor(private typeChecker: ts.TypeChecker, private childNodeParser: NodeParser) {}

    public supportsNode(node: ts.FunctionTypeNode | ts.FunctionDeclaration | ts.MethodSignature): boolean {
        return (
            node.kind === ts.SyntaxKind.FunctionDeclaration ||
            node.kind === ts.SyntaxKind.FunctionType ||
            node.kind === ts.SyntaxKind.MethodSignature
        );
    }
    public createType(node: ts.FunctionDeclaration, context: Context): BaseType {
        if (node.typeParameters && node.typeParameters.length) {
            node.typeParameters.forEach((typeParam) => {
                const nameSymbol = this.typeChecker.getSymbolAtLocation(typeParam.name)!;
                context.pushParameter(nameSymbol.name);

                let type;

                if (typeParam.default) {
                    type = this.childNodeParser.createType(typeParam.default, context);
                }

                if (!type) {
                    type = new UnknownType();
                }
                context.setDefault(nameSymbol.name, type);
            });
        }

        return new FunctionType(
            this.getTypeId(node, context),
            [],
            this.getParameters(node, context),
            this.getAdditionalParameters(node, context),
            this.childNodeParser.createType(node.type!, context)!
        );
    }

    private getParameters(node: ts.FunctionDeclaration, context: Context): FunctionParameter[] {
        return node.parameters.filter(ts.isParameter).reduce((result: FunctionParameter[], parameterNode) => {
            const parameterSymbol = symbolAtNode(parameterNode);
            if (!parameterSymbol) return result;
            if (isHidden(parameterSymbol)) {
                return result;
            }
            const objectParameter: FunctionParameter = new FunctionParameter(
                parameterSymbol.getName(),
                this.childNodeParser.createType(parameterNode.type!, context)!,
                !parameterNode.questionToken
            );

            result.push(objectParameter);
            return result;
        }, []);
    }
    private getAdditionalParameters(node: ts.FunctionDeclaration, context: Context): BaseType | false {
        const indexSignature = node.parameters.find(ts.isIndexSignatureDeclaration);
        if (!indexSignature) {
            return false;
        }

        return this.childNodeParser.createType(indexSignature.type!, context)!;
    }

    private getTypeId(node: ts.Node, context: Context): string {
        const fullName = `function-${node.getFullStart()}`;

        const argumentIds = context.getArguments().map((arg) => arg!.getId());

        return argumentIds.length ? `${fullName}<${argumentIds.join(",")}>` : fullName;
    }
}
