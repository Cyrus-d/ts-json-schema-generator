import * as ts from "typescript";
import { Context } from "./NodeParser";
import { SubNodeParser } from "./SubNodeParser";
import { BaseType } from "./Type/BaseType";
import { ReferenceType } from "./Type/ReferenceType";
<<<<<<< HEAD
import {
    getKey,
    isInSkipParseFiles,
    isInForceParseTypes,
    extendKey,
    isRecursionToType,
    hasLimitOptions,
} from "./Utils";
import { Config } from "../src/Config";
=======
import { getKey } from "./Utils/nodeKey";
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

export class CircularReferenceNodeParser implements SubNodeParser {
    private circular = new Map<string, BaseType>();

<<<<<<< HEAD
    public constructor(private childNodeParser: SubNodeParser, private config: Config) {}
=======
    public constructor(private childNodeParser: SubNodeParser) {}
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

    public supportsNode(node: ts.Node): boolean {
        if (isInSkipParseFiles(node, this.config)) {
            if (!isInForceParseTypes(node, this.config)) {
                return false;
            }
        }

        return this.childNodeParser.supportsNode(node);
    }
<<<<<<< HEAD

    public createType(node: ts.Node, context: Context): BaseType | undefined {
        const key = extendKey(getKey(node, context), node, context, this.config);
        context.ignoreLimits = hasLimitOptions(this.config) && isRecursionToType(node, context, this.config.type);

=======
    public createType(node: ts.Node, context: Context): BaseType | undefined {
        const key = getKey(node, context);
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
        if (this.circular.has(key)) {
            context.ignoreLimits = false;
            return this.circular.get(key)!;
        }

        const reference = new ReferenceType();
<<<<<<< HEAD

        // https://github.com/vega/ts-json-schema-generator/issues/357
        reference.setId("circularRef-" + key);

        this.circular.set(key, reference);
        const type = this.childNodeParser.createType(node, context, reference);
        context.ignoreLimits = false;
        if (type) {
            reference.setType(type);
        }
        this.circular.delete(key);

=======
        this.circular.set(key, reference);
        const type = this.childNodeParser.createType(node, context, reference);
        if (type) {
            reference.setType(type);
        }
        this.circular.delete(key);

>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
        return type;
    }
}
