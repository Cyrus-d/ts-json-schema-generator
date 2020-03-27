import { BaseError } from "./BaseError";
import * as ts from "typescript";
import { getNodeInfo } from "./utils";

export class LogicError extends BaseError {
<<<<<<< HEAD
    public constructor(private msg: string, node?: ts.Node) {
        super(msg + getNodeInfo(node));
=======
    public constructor(private msg: string) {
        super(msg);
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
    }
}
