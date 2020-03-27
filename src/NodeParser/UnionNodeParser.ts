import * as ts from "typescript";
import { Context, NodeParser } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { UnionType } from "../Type/UnionType";
import { BaseType } from "../Type/BaseType";
<<<<<<< HEAD
import { notUndefined, isExcludedProp } from "../Utils";
import { Config } from "../Config";

export class UnionNodeParser implements SubNodeParser {
    public constructor(
        private typeChecker: ts.TypeChecker,
        private childNodeParser: NodeParser,
        private config: Config
    ) {}
=======
import { notUndefined } from "../Utils/notUndefined";

export class UnionNodeParser implements SubNodeParser {
    public constructor(private typeChecker: ts.TypeChecker, private childNodeParser: NodeParser) {}
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

    public supportsNode(node: ts.UnionTypeNode): boolean {
        return node.kind === ts.SyntaxKind.UnionType;
    }

    public createType(node: ts.UnionTypeNode, context: Context): BaseType | undefined {
        const types = node.types
<<<<<<< HEAD
            .filter(x => !isExcludedProp(x, context, this.config))
            .map(subnode => {
=======
            .map((subnode) => {
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
                return this.childNodeParser.createType(subnode, context);
            })
            .filter(notUndefined);

        if (types.length === 1) {
            return types[0];
        } else if (types.length === 0) {
            return undefined;
        }

        return new UnionType(types);
    }
}
