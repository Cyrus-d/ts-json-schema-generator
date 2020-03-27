import * as ts from "typescript";
import { Context, NodeParser } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { AliasType } from "../Type/AliasType";
import { BaseType } from "../Type/BaseType";
import { ReferenceType } from "../Type/ReferenceType";
<<<<<<< HEAD
import { getKey, extendKey } from "../Utils";
import { Config } from "../Config";

export class TypeAliasNodeParser implements SubNodeParser {
    public constructor(
        private typeChecker: ts.TypeChecker,
        private childNodeParser: NodeParser,
        private config: Config
    ) {}
=======
import { getKey } from "../Utils/nodeKey";

export class TypeAliasNodeParser implements SubNodeParser {
    public constructor(private typeChecker: ts.TypeChecker, private childNodeParser: NodeParser) {}
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

    public supportsNode(node: ts.TypeAliasDeclaration): boolean {
        return node.kind === ts.SyntaxKind.TypeAliasDeclaration;
    }

    public createType(
        node: ts.TypeAliasDeclaration,
        context: Context,
        reference?: ReferenceType
    ): BaseType | undefined {
        if (node.typeParameters?.length) {
<<<<<<< HEAD
            node.typeParameters.forEach(typeParam => {
=======
            for (const typeParam of node.typeParameters) {
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
                const nameSymbol = this.typeChecker.getSymbolAtLocation(typeParam.name)!;
                context.pushParameter(nameSymbol.name);

                if (typeParam.default) {
                    const type = this.childNodeParser.createType(typeParam.default, context);
                    context.setDefault(nameSymbol.name, type);
                }
            }
        }

        const id = this.getTypeId(node, context);
        const name = this.getTypeName(node, context);
        if (reference) {
            reference.setId(id);
            reference.setName(name);
        }

<<<<<<< HEAD
        const id = this.getTypeId(node, context);
        if (reference) {
            reference.setId(id);
            reference.setName(id);
        }

=======
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
        const type = this.childNodeParser.createType(node.type, context);
        if (type === undefined) {
            return undefined;
        }
        return new AliasType(id, type);
<<<<<<< HEAD
    }

    private getTypeId(node: ts.Node, context: Context): string {
        return extendKey(`alias-${getKey(node, context)}`, node, context, this.config);
=======
    }

    private getTypeId(node: ts.TypeAliasDeclaration, context: Context): string {
        return `alias-${getKey(node, context)}`;
    }

    private getTypeName(node: ts.TypeAliasDeclaration, context: Context): string {
        const argumentIds = context.getArguments().map((arg) => arg?.getName());
        const fullName = node.name.getText();

        return argumentIds.length ? `${fullName}<${argumentIds.join(",")}>` : fullName;
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
    }
}
