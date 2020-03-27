import * as ts from "typescript";
import { Context, NodeParser } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { ArrayType } from "../Type/ArrayType";
import { BaseType } from "../Type/BaseType";
import { ObjectProperty, ObjectType } from "../Type/ObjectType";
import { ReferenceType } from "../Type/ReferenceType";
import { isNodeHidden } from "../Utils/isHidden";
import { isPublic, isStatic } from "../Utils/modifiers";
import { getKey } from "../Utils/nodeKey";
import { notUndefined } from "../Utils/notUndefined";
<<<<<<< HEAD
import { isExcludedProp, extendKey } from "../Utils";
import { Config } from "../Config";

export class InterfaceAndClassNodeParser implements SubNodeParser {
    public constructor(
        private typeChecker: ts.TypeChecker,
        private childNodeParser: NodeParser,
        private config: Config
    ) {}
=======

export class InterfaceAndClassNodeParser implements SubNodeParser {
    public constructor(private typeChecker: ts.TypeChecker, private childNodeParser: NodeParser) {}
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

    public supportsNode(node: ts.InterfaceDeclaration | ts.ClassDeclaration): boolean {
        return node.kind === ts.SyntaxKind.InterfaceDeclaration || node.kind === ts.SyntaxKind.ClassDeclaration;
    }

    public createType(
        node: ts.InterfaceDeclaration | ts.ClassDeclaration,
        context: Context,
        reference?: ReferenceType
    ): BaseType | undefined {
        if (node.typeParameters?.length) {
<<<<<<< HEAD
            node.typeParameters.forEach(typeParam => {
=======
            node.typeParameters.forEach((typeParam) => {
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
                const nameSymbol = this.typeChecker.getSymbolAtLocation(typeParam.name)!;
                context.pushParameter(nameSymbol.name);

                if (typeParam.default) {
                    const type = this.childNodeParser.createType(typeParam.default, context);
                    context.setDefault(nameSymbol.name, type);
                }
            });
        }

        const id = this.getTypeId(node, context);
        if (reference) {
            reference.setId(id);
            reference.setName(id);
        }

        const properties = this.getProperties(node, context);

        if (properties === undefined) {
            return undefined;
        }

        const additionalProperties = this.getAdditionalProperties(node, context);

        // When type only extends Array or ReadonlyArray then create an array type instead of an object type
        if (properties.length === 0 && additionalProperties === false) {
            const arrayItemType = this.getArrayItemType(node);
            if (arrayItemType) {
                const type = this.childNodeParser.createType(arrayItemType, context);
                if (type === undefined) {
                    return undefined;
                }
                return new ArrayType(type);
            }
        }

        return new ObjectType(id, this.getBaseTypes(node, context), properties, additionalProperties);
    }

    /**
     * If specified node extends Array or ReadonlyArray and nothing else then this method returns the
     * array item type. In all other cases null is returned to indicate that the node is not a simple array.
     *
     * @param node - The interface or class to check.
     * @return The array item type if node is an array, null otherwise.
     */
    private getArrayItemType(node: ts.InterfaceDeclaration | ts.ClassDeclaration): ts.TypeNode | null {
        if (node.heritageClauses && node.heritageClauses.length === 1) {
            const clause = node.heritageClauses[0];
            if (clause.types.length === 1) {
                const type = clause.types[0];
                const symbol = this.typeChecker.getSymbolAtLocation(type.expression);
                if (symbol && (symbol.name === "Array" || symbol.name === "ReadonlyArray")) {
                    const typeArguments = type.typeArguments;
                    if (typeArguments?.length === 1) {
                        return typeArguments[0];
                    }
                }
            }
        }
        return null;
    }

    private getBaseTypes(node: ts.InterfaceDeclaration | ts.ClassDeclaration, context: Context): BaseType[] {
        if (!node.heritageClauses) {
            return [];
        }

        return node.heritageClauses.reduce(
            (result: BaseType[], baseType) => [
                ...result,
                ...baseType.types
<<<<<<< HEAD
                    .map(expression => this.childNodeParser.createType(expression, context))
=======
                    .map((expression) => this.childNodeParser.createType(expression, context))
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
                    .filter(notUndefined),
            ],
            []
        );
    }

    private getProperties(
        node: ts.InterfaceDeclaration | ts.ClassDeclaration,
        context: Context
    ): ObjectProperty[] | undefined {
        let hasRequiredNever = false;

        const properties = (node.members as ts.NodeArray<ts.TypeElement | ts.ClassElement>)
<<<<<<< HEAD
            .filter(member => !isExcludedProp(member, context, this.config))
            .reduce((members, member) => {
                if (ts.isConstructorDeclaration(member)) {
                    const params = member.parameters.filter(param =>
=======
            .reduce((members, member) => {
                if (ts.isConstructorDeclaration(member)) {
                    const params = member.parameters.filter((param) =>
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
                        ts.isParameterPropertyDeclaration(param, param.parent)
                    ) as ts.ParameterPropertyDeclaration[];
                    members.push(...params);
                } else if (ts.isPropertySignature(member) || ts.isPropertyDeclaration(member)) {
                    members.push(member);
                }
                return members;
            }, [] as (ts.PropertyDeclaration | ts.PropertySignature | ts.ParameterPropertyDeclaration)[])
<<<<<<< HEAD
            .filter(member => isPublic(member) && !isStatic(member) && member.type && !isNodeHidden(member))
            .map(
                member =>
=======
            .filter((member) => isPublic(member) && !isStatic(member) && member.type && !isNodeHidden(member))
            .map(
                (member) =>
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
                    new ObjectProperty(
                        member.name.getText(),
                        this.childNodeParser.createType(member.type!, context),
                        !member.questionToken
                    )
            )
<<<<<<< HEAD
            .filter(prop => {
=======
            .filter((prop) => {
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
                if (prop.isRequired() && prop.getType() === undefined) {
                    hasRequiredNever = true;
                }
                return prop.getType() !== undefined;
            });

        if (hasRequiredNever) {
            return undefined;
        }

        return properties;
    }

    private getAdditionalProperties(
        node: ts.InterfaceDeclaration | ts.ClassDeclaration,
        context: Context
    ): BaseType | false {
        const indexSignature = (node.members as ts.NodeArray<ts.NamedDeclaration>).find(ts.isIndexSignatureDeclaration);
        if (!indexSignature) {
            return false;
        }

        return this.childNodeParser.createType(indexSignature.type!, context) ?? false;
    }

    private getTypeId(node: ts.Node, context: Context): string {
        const nodeType = ts.isInterfaceDeclaration(node) ? "interface" : "class";
<<<<<<< HEAD
        return extendKey(`${nodeType}-${getKey(node, context)}`, node, context, this.config, true);
=======
        return `${nodeType}-${getKey(node, context)}`;
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
    }
}
