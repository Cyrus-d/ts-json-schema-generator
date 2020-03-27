<<<<<<< HEAD
import { JSONSchema7, JSONSchema7Definition } from "json-schema";

export interface Definition extends JSONSchema7 {
    propertyOrder?: string[];
    parameters?: JSONSchema7Definition;
    defaultProperties?: string[];
    locale?: string;
    kind?: "function";
    name?: string;
    label?: string;
}

export interface DefinitionMap {
    [name: string]: JSONSchema7Definition;
}
=======
import { JSONSchema7 } from "json-schema";

export type Definition = JSONSchema7;
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
