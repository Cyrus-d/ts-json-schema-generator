import * as ts from "typescript";
import { Context, NodeParser } from "./NodeParser";
import { BaseType } from "./Type/BaseType";
import { DefinitionType } from "./Type/DefinitionType";

export class TopRefNodeParser implements NodeParser {
<<<<<<< HEAD
    public constructor(private childNodeParser: NodeParser, private fullName: string, private topRef: boolean) {}
    // hack to change the fullName by 'createSchemaByNodeKind' for parsing multiple node
    // other option would be adding a 'fullName' field to BaseType
    public setFullName(fullName: string) {
        this.fullName = fullName;
    }
=======
    public constructor(
        private childNodeParser: NodeParser,
        private fullName: string | undefined,
        private topRef: boolean
    ) {}
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

    public createType(node: ts.Node, context: Context): BaseType | undefined {
        const baseType = this.childNodeParser.createType(node, context);

        if (baseType === undefined) {
            return undefined;
        }

        if (this.topRef && !(baseType instanceof DefinitionType)) {
            return new DefinitionType(this.fullName, baseType);
        } else if (!this.topRef && baseType instanceof DefinitionType) {
            return baseType.getType();
        } else {
            return baseType;
        }
    }
}
