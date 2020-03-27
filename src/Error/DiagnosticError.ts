import * as ts from "typescript";
import { BaseError } from "./BaseError";

export class DiagnosticError extends BaseError {
    public constructor(private diagnostics: readonly ts.Diagnostic[]) {
        super(
<<<<<<< HEAD
            diagnostics.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")).join("\n\n")
=======
            diagnostics.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")).join("\n\n")
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
        );
    }

    public getDiagnostics() {
        return this.diagnostics;
    }
}
