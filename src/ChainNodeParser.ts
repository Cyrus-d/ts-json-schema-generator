import * as ts from "typescript";
import { UnknownNodeError } from "./Error/UnknownNodeError";
import { Context } from "./NodeParser";
import { SubNodeParser } from "./SubNodeParser";
import { BaseType } from "./Type/BaseType";
import { ReferenceType } from "./Type/ReferenceType";
<<<<<<< HEAD
import { Config } from "./Config";
=======
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

export class ChainNodeParser implements SubNodeParser {
    private typeCaches = new WeakMap<ts.Node, Map<string, BaseType | undefined>>();

<<<<<<< HEAD
    public constructor(
        private typeChecker: ts.TypeChecker,
        private nodeParsers: SubNodeParser[],
        private config: Config
    ) {}
=======
    public constructor(private typeChecker: ts.TypeChecker, private nodeParsers: SubNodeParser[]) {}
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

    public addNodeParser(nodeParser: SubNodeParser): this {
        this.nodeParsers.push(nodeParser);
        return this;
    }

    public supportsNode(node: ts.Node): boolean {
        return this.nodeParsers.some(nodeParser => nodeParser.supportsNode(node));
    }

    public createType(node: ts.Node, context: Context, reference?: ReferenceType): BaseType | undefined {
        let typeCache = this.typeCaches.get(node);
        if (typeCache == null) {
            typeCache = new Map<string, BaseType | undefined>();
            this.typeCaches.set(node, typeCache);
        }
<<<<<<< HEAD
        const contextCacheKey = context.getCacheKey(this.config);
=======
        const contextCacheKey = context.getCacheKey();
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
        let type = typeCache.get(contextCacheKey);
        if (!type) {
            type = this.getNodeParser(node, context).createType(node, context, reference);
            if (!(type instanceof ReferenceType)) {
                typeCache.set(contextCacheKey, type);
            }
        }
        return type;
    }

    private getNodeParser(node: ts.Node, context: Context): SubNodeParser {
        for (const nodeParser of this.nodeParsers) {
            if (nodeParser.supportsNode(node)) {
                return nodeParser;
            }
        }

        throw new UnknownNodeError(node, context.getReference());
    }
}
