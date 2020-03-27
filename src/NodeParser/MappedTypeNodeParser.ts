import * as ts from "typescript";
import { LogicError } from "../Error/LogicError";
import { Context, NodeParser } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { ArrayType } from "../Type/ArrayType";
import { BaseType } from "../Type/BaseType";
import { EnumType, EnumValue } from "../Type/EnumType";
import { LiteralType } from "../Type/LiteralType";
import { NumberType } from "../Type/NumberType";
import { ObjectProperty, ObjectType } from "../Type/ObjectType";
import { StringType } from "../Type/StringType";
import { UnionType } from "../Type/UnionType";
import { derefAnnotatedType, derefType } from "../Utils/derefType";
import { getKey } from "../Utils/nodeKey";
import { preserveAnnotation } from "../Utils/preserveAnnotation";
import { removeUndefined } from "../Utils/removeUndefined";
<<<<<<< HEAD
import { notUndefined, isExcludedProp } from "../Utils";
import { Config } from "../Config";

export class MappedTypeNodeParser implements SubNodeParser {
    public constructor(private childNodeParser: NodeParser, private config: Config) {}
=======
import { notUndefined } from "../Utils/notUndefined";

export class MappedTypeNodeParser implements SubNodeParser {
    public constructor(private childNodeParser: NodeParser) {}
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

    public supportsNode(node: ts.MappedTypeNode): boolean {
        return node.kind === ts.SyntaxKind.MappedType;
    }

    public createType(node: ts.MappedTypeNode, context: Context): BaseType | undefined {
        const constraintType = this.childNodeParser.createType(node.typeParameter.constraint!, context);

        const id = `indexed-type-${getKey(node, context)}`;

        if (!constraintType) {
            return new ObjectType(id, [], [], false);
        }

        const keyListType = derefType(constraintType);
<<<<<<< HEAD
=======
        const id = `indexed-type-${getKey(node, context)}`;
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

        if (keyListType instanceof UnionType) {
            // Key type resolves to a set of known properties
            return new ObjectType(
                id,
                [],
                this.getProperties(node, keyListType, context),
                this.getAdditionalProperties(node, keyListType, context)
            );
        } else if (keyListType instanceof LiteralType) {
            // Key type resolves to single known property
            return new ObjectType(id, [], this.getProperties(node, new UnionType([keyListType]), context), false);
        } else if (keyListType instanceof StringType) {
            // Key type widens to `string`
            const type = this.childNodeParser.createType(node.type!, context);
            return type === undefined ? undefined : new ObjectType(id, [], [], type);
        } else if (keyListType instanceof NumberType) {
            const type = this.childNodeParser.createType(node.type!, this.createSubContext(node, keyListType, context));
            return type === undefined ? undefined : new ArrayType(type);
        } else if (keyListType instanceof EnumType) {
            return new ObjectType(id, [], this.getValues(node, keyListType, context), false);
        } else {
            throw new LogicError(
                // eslint-disable-next-line max-len
                `Unexpected key type "${
                    constraintType ? constraintType.getId() : constraintType
<<<<<<< HEAD
                }" for type "${node.getText()}" (expected "UnionType" or "StringType")`,
                node
=======
                }" for type "${node.getText()}" (expected "UnionType" or "StringType")`
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
            );
        }
    }

    private getProperties(node: ts.MappedTypeNode, keyListType: UnionType, context: Context): ObjectProperty[] {
        return keyListType
            .getTypes()
<<<<<<< HEAD
            .filter(type => type instanceof LiteralType)
            .filter((type: LiteralType) => !isExcludedProp(type, new Context(node), this.config))
=======
            .filter((type) => type instanceof LiteralType)
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
            .reduce((result: ObjectProperty[], key: LiteralType) => {
                const propertyType = this.childNodeParser.createType(
                    node.type!,
                    this.createSubContext(node, key, context)
                );

                if (propertyType === undefined) {
                    return result;
                }

                let newType = derefAnnotatedType(propertyType);
                let hasUndefined = false;
                if (newType instanceof UnionType) {
                    const { newType: newType_, numRemoved } = removeUndefined(newType);
                    hasUndefined = numRemoved > 0;
                    newType = newType_;
                }
<<<<<<< HEAD

                const objectProperty = new ObjectProperty(
                    key.getValue().toString(),
                    preserveAnnotation(propertyType, newType),
                    !node.questionToken && !hasUndefined
                );

                result.push(objectProperty);
                return result;
            }, []);
    }

    private getValues(node: ts.MappedTypeNode, keyListType: EnumType, context: Context): ObjectProperty[] {
        return keyListType
            .getValues()
            .filter((value: EnumValue) => !!value)
            .map((value: EnumValue) => {
                const type = this.childNodeParser.createType(
                    node.type!,
                    this.createSubContext(node, new LiteralType(value!), context)
                );

=======

                const objectProperty = new ObjectProperty(
                    key.getValue().toString(),
                    preserveAnnotation(propertyType, newType),
                    !node.questionToken && !hasUndefined
                );

                result.push(objectProperty);
                return result;
            }, []);
    }

    private getValues(node: ts.MappedTypeNode, keyListType: EnumType, context: Context): ObjectProperty[] {
        return keyListType
            .getValues()
            .filter((value: EnumValue) => !!value)
            .map((value: EnumValue) => {
                const type = this.childNodeParser.createType(
                    node.type!,
                    this.createSubContext(node, new LiteralType(value!), context)
                );

>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
                if (type === undefined) {
                    return undefined;
                }

                return new ObjectProperty(value!.toString(), type, !node.questionToken);
            })
            .filter(notUndefined);
    }

    private getAdditionalProperties(
        node: ts.MappedTypeNode,
        keyListType: UnionType,
        context: Context
    ): BaseType | false {
<<<<<<< HEAD
        const key = keyListType.getTypes().filter(type => !(type instanceof LiteralType))[0];
=======
        const key = keyListType.getTypes().filter((type) => !(type instanceof LiteralType))[0];
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
        if (key) {
            return this.childNodeParser.createType(node.type!, this.createSubContext(node, key, context)) ?? false;
        } else {
            return false;
        }
    }

    private createSubContext(node: ts.MappedTypeNode, key: LiteralType | StringType, parentContext: Context): Context {
<<<<<<< HEAD
        const subContext = new Context(node, parentContext);
=======
        const subContext = new Context(node);
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

        parentContext.getParameters().forEach(parentParameter => {
            subContext.pushParameter(parentParameter);
            subContext.pushArgument(parentContext.getArgument(parentParameter));
        });

        subContext.pushParameter(node.typeParameter.name.text);
        subContext.pushArgument(key);

        return subContext;
    }
}
