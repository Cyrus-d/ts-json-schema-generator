import { Definition } from "../Schema/Definition";
import { SubTypeFormatter } from "../SubTypeFormatter";
import { AnyType } from "../Type/AnyType";
import { BaseType } from "../Type/BaseType";
import { ObjectProperty, ObjectType } from "../Type/ObjectType";
import { UndefinedType } from "../Type/UndefinedType";
import { UnionType } from "../Type/UnionType";
import { TypeFormatter } from "../TypeFormatter";
import { getAllOfDefinitionReducer } from "../Utils/allOfDefinition";
import { derefType } from "../Utils/derefType";
import { preserveAnnotation } from "../Utils/preserveAnnotation";
import { removeUndefined } from "../Utils/removeUndefined";
import { StringMap } from "../Utils/StringMap";
import { uniqueArray } from "../Utils/uniqueArray";
<<<<<<< HEAD
import { Config } from "../../src/Config";

export class ObjectTypeFormatter implements SubTypeFormatter {
    public constructor(private childTypeFormatter: TypeFormatter, private config: Config) {}
=======

export class ObjectTypeFormatter implements SubTypeFormatter {
    public constructor(private childTypeFormatter: TypeFormatter) {}
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

    public supportsType(type: ObjectType): boolean {
        return type instanceof ObjectType;
    }

    public getDefinition(type: ObjectType): Definition {
        const types = type.getBaseTypes();
        if (types.length === 0) {
            return this.getObjectDefinition(type);
        }

<<<<<<< HEAD
        return types.reduce(getAllOfDefinitionReducer(this.childTypeFormatter, false), this.getObjectDefinition(type));
=======
        return types.reduce(getAllOfDefinitionReducer(this.childTypeFormatter), this.getObjectDefinition(type));
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
    }

    public getChildren(type: ObjectType): BaseType[] {
        const properties = type.getProperties();
        const additionalProperties: BaseType | boolean = type.getAdditionalProperties();

<<<<<<< HEAD
        const children = [
            ...type
                .getBaseTypes()
                .reduce(
                    (result: BaseType[], baseType) => [
                        ...result,
                        ...this.childTypeFormatter
                            .getChildren(baseType)
                            .filter(childType => childType.getName() !== baseType.getName()),
                    ],
                    []
                ),

            ...(additionalProperties instanceof BaseType
                ? this.childTypeFormatter.getChildren(additionalProperties)
                : []),

            ...properties.reduce((result: BaseType[], property) => {
                const propertyType = property.getType();
                if (propertyType === undefined) {
                    return result;
                }

                return [...result, ...this.childTypeFormatter.getChildren(propertyType)];
            }, []),
        ];
=======
        const childrenOfBase = type
            .getBaseTypes()
            .reduce(
                (result: BaseType[], baseType) => [...result, ...this.childTypeFormatter.getChildren(baseType)],
                []
            );

        const childrenOfAdditionalProps =
            additionalProperties instanceof BaseType ? this.childTypeFormatter.getChildren(additionalProperties) : [];

        const childrenOfProps = properties.reduce((result: BaseType[], property) => {
            const propertyType = property.getType();
            if (propertyType === undefined) {
                return result;
            }

            return [...result, ...this.childTypeFormatter.getChildren(propertyType)];
        }, []);

        const children = [...childrenOfBase, ...childrenOfAdditionalProps, ...childrenOfProps];
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

        return uniqueArray(children);
    }

    private getObjectDefinition(type: ObjectType): Definition {
        const objectProperties = type.getProperties();
        const additionalProperties: BaseType | boolean = type.getAdditionalProperties();

<<<<<<< HEAD
        const preparedProperties = objectProperties.map(property => this.prepareObjectProperty(property));

        const required = preparedProperties
            .filter(property => property.isRequired())
            .map(property => property.getName());
=======
        const preparedProperties = objectProperties.map((property) => this.prepareObjectProperty(property));

        const required = preparedProperties
            .filter((property) => property.isRequired())
            .map((property) => property.getName());
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

        const properties = preparedProperties.reduce((result: StringMap<Definition>, property) => {
            const propertyType = property.getType();

            if (propertyType !== undefined) {
                result[property.getName()] = this.childTypeFormatter.getDefinition(propertyType);
            }

            return result;
        }, {});
<<<<<<< HEAD

        const anyProps = Object.keys(properties).length;
        /* to use in my application, disabled in test to pass original tests */
        if (anyProps && this.config.setObjectIdentifier) {
            (properties as any).__obj__ = true;
        }

        return {
            type: "object",
            ...(anyProps ? { properties } : {}),
=======

        return {
            type: "object",
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
            ...(Object.keys(properties).length > 0 ? { properties } : {}),
            ...(required.length > 0 ? { required } : {}),
            ...(additionalProperties === true || additionalProperties instanceof AnyType
                ? {}
                : {
                      additionalProperties:
                          additionalProperties instanceof BaseType
                              ? this.childTypeFormatter.getDefinition(additionalProperties)
                              : additionalProperties,
                  }),
        };
    }

    private prepareObjectProperty(property: ObjectProperty): ObjectProperty {
        const propertyType = property.getType();
        const propType = derefType(propertyType);
        if (propType instanceof UndefinedType) {
            return new ObjectProperty(property.getName(), propertyType, false);
        } else if (!(propType instanceof UnionType)) {
            return property;
        }

        const { newType: newPropType, numRemoved } = removeUndefined(propType);

        if (numRemoved == 0) {
            return property;
        }

        return new ObjectProperty(property.getName(), preserveAnnotation(propertyType!, newPropType), false);
    }
}
