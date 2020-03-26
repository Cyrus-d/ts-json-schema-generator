import * as ts from "typescript";
import { LogicError } from "../Error/LogicError";
import { Context, NodeParser } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { BaseType } from "../Type/BaseType";
import { ObjectType, ObjectProperty } from "../Type/ObjectType";
import { ReferenceType } from "../Type/ReferenceType";
import { isExcludedProp } from "../Utils";
import { getKey } from "../Utils/nodeKey";
import { LiteralType } from "../Type/LiteralType";
import { Config } from "../Config";

export class TypeofNodeParser implements SubNodeParser {
    public constructor(
        private typeChecker: ts.TypeChecker,
        private childNodeParser: NodeParser,
        private config: Config
    ) {}

    public supportsNode(node: ts.TypeQueryNode): boolean {
        if (node.kind !== ts.SyntaxKind.TypeQuery) return false;
        let symbol = this.typeChecker.getSymbolAtLocation(node.exprName)!;
        if (symbol.flags & ts.SymbolFlags.Alias) {
            symbol = this.typeChecker.getAliasedSymbol(symbol);
        }
        return symbol.valueDeclaration ? true : false;
    }

    public createType(node: ts.TypeQueryNode, context: Context, reference?: ReferenceType): BaseType | undefined {
        let symbol = this.typeChecker.getSymbolAtLocation(node.exprName)!;
        if (symbol.flags & ts.SymbolFlags.Alias) {
            symbol = this.typeChecker.getAliasedSymbol(symbol);
        }
        context.setOperator("typeof");
        const valueDec = symbol.valueDeclaration;
        if (ts.isEnumDeclaration(valueDec)) {
            return this.createObjectFromEnum(valueDec, context, reference, node);
        } else if (ts.isVariableDeclaration(valueDec) || ts.isPropertySignature(valueDec)) {
            if (valueDec.type) {
                return this.childNodeParser.createType(valueDec.type, context);
            } else if (valueDec.initializer) {
                return this.childNodeParser.createType(valueDec.initializer, context);
            }
        } else if (ts.isClassDeclaration(valueDec)) {
            return this.childNodeParser.createType(valueDec, context);
        } else if (ts.isFunctionDeclaration(valueDec)) {
            return this.childNodeParser.createType(valueDec, context, reference);
        }

        throw new LogicError(`Invalid type query "${valueDec.getFullText()}" (ts.SyntaxKind = ${valueDec.kind})`, node);
    }

    private createObjectFromEnum(
        node: ts.EnumDeclaration,
        context: Context,
        reference?: ReferenceType,
        parentNode?: ts.Node
    ): ObjectType {
        const id = `typeof-enum-${getKey(node, context)}`;
        if (reference) {
            reference.setId(id);
            reference.setName(id);
        }

        let type: BaseType | null | undefined = null;
        const properties = node.members
            .filter(member => !isExcludedProp(member, new Context(parentNode), this.config))
            .map(member => {
                const name = member.name.getText();
                if (member.initializer) {
                    type = this.childNodeParser.createType(member.initializer, context);
                } else if (type === null) {
                    type = new LiteralType(0);
                } else if (type instanceof LiteralType && typeof type.getValue() === "number") {
                    type = new LiteralType(+type.getValue() + 1);
                } else {
                    throw new LogicError(`Enum initializer missing for "${name}"`, node);
                }
                return new ObjectProperty(name, type, true);
            });

        return new ObjectType(id, [], properties, false);
    }
}
