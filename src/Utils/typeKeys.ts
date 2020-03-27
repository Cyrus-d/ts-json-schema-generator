import { AnyType } from "../Type/AnyType";
import { ArrayType } from "../Type/ArrayType";
import { BaseType } from "../Type/BaseType";
import { IntersectionType } from "../Type/IntersectionType";
import { LiteralType } from "../Type/LiteralType";
import { NumberType } from "../Type/NumberType";
import { ObjectType } from "../Type/ObjectType";
import { StringType } from "../Type/StringType";
import { TupleType } from "../Type/TupleType";
import { UndefinedType } from "../Type/UndefinedType";
import { UnionType } from "../Type/UnionType";
import { derefAnnotatedType, derefType } from "./derefType";
import { preserveAnnotation } from "./preserveAnnotation";
import { uniqueArray } from "./uniqueArray";

function uniqueLiterals(types: LiteralType[]): LiteralType[] {
    const values = types.map(type => type.getValue());
    return uniqueArray(values).map(value => new LiteralType(value));
}

export function getTypeKeys(type: BaseType | undefined): LiteralType[] {
    type = derefType(type);

    if (type instanceof IntersectionType || type instanceof UnionType) {
        return uniqueLiterals(
            type.getTypes().reduce((result: LiteralType[], subType) => [...result, ...getTypeKeys(subType)], [])
        );
    }

    if (type instanceof TupleType) {
        return type.getTypes().map((it, idx) => new LiteralType(idx));
    }
    if (type instanceof ObjectType) {
<<<<<<< HEAD
        const objectProperties = type.getProperties().map(it => new LiteralType(it.getName()));
=======
        const objectProperties = type.getProperties().map((it) => new LiteralType(it.getName()));
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
        return uniqueLiterals(
            type
                .getBaseTypes()
                .reduce(
                    (result: LiteralType[], parentType) => [...result, ...getTypeKeys(parentType)],
                    objectProperties
                )
        );
    }

    return [];
}

export function getTypeByKey(type: BaseType | undefined, index: LiteralType | StringType): BaseType | undefined {
    type = derefType(type);

    if (type instanceof IntersectionType || type instanceof UnionType) {
        for (const subType of type.getTypes()) {
            const subKeyType = getTypeByKey(subType, index);
            if (subKeyType) {
                return subKeyType;
            }
        }

        return undefined;
    }

    if (type instanceof TupleType && index instanceof LiteralType) {
        return type.getTypes().find((it, idx) => idx === index.getValue());
    }
    if (type instanceof ArrayType && index instanceof NumberType) {
        return type.getItem();
    }
    if (type instanceof ObjectType) {
        if (index instanceof LiteralType) {
<<<<<<< HEAD
            const property = type.getProperties().find(it => it.getName() === index.getValue());
=======
            const property = type.getProperties().find((it) => it.getName() === index.getValue());
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
            if (property) {
                const propertyType = property.getType();
                if (propertyType === undefined) {
                    return undefined;
                }
                let newPropType = derefAnnotatedType(propertyType);
                if (!property.isRequired()) {
                    if (newPropType instanceof UnionType) {
<<<<<<< HEAD
                        if (!newPropType.getTypes().some(subType => subType instanceof UndefinedType)) {
=======
                        if (!newPropType.getTypes().some((subType) => subType instanceof UndefinedType)) {
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
                            newPropType = new UnionType([...newPropType.getTypes(), new UndefinedType()]);
                        }
                    } else {
                        newPropType = new UnionType([newPropType, new UndefinedType()]);
                    }
                }

                return preserveAnnotation(propertyType, newPropType);
            }
        }

        const additionalProperty = type.getAdditionalProperties();
        if (additionalProperty instanceof BaseType) {
            return additionalProperty;
        } else if (additionalProperty === true) {
            return new AnyType();
        }

        for (const subType of type.getBaseTypes()) {
            const subKeyType = getTypeByKey(subType, index);
            if (subKeyType) {
                return subKeyType;
            }
        }

        return undefined;
    }

    return undefined;
}
