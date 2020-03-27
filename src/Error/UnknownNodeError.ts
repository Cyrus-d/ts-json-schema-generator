import * as ts from "typescript";
import { BaseError } from "./BaseError";
import { getNodeInfo } from "./utils";

export class UnknownNodeError extends BaseError {
    public constructor(private node: ts.Node, private reference?: ts.Node) {
<<<<<<< HEAD
        super(`Unknown node "${node.getFullText()}: ${getNodeInfo(node)}`);
=======
        super(`Unknown node "${node.getFullText()}`);
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
    }

    public getNode(): ts.Node {
        return this.node;
    }

    public getReference(): ts.Node | undefined {
        return this.reference;
    }
}
