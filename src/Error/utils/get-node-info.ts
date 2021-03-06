import * as ts from "typescript";
import { getNodeName } from "../../Utils";

export const getNodeInfo = (node?: ts.Node) => {
    if (!node) return "";
    const infos: string[] = [];
    const nodeName = getNodeName(node);
    infos.push(`\n------------ Node Info ------------`);
    infos.push(`\nsymbol name=${nodeName}`);
    infos.push(`kind=${node.kind}`);
    infos.push(`source file=${node.getSourceFile().fileName}:${node.parent.getStart()}`);
    infos.push(`parent=${getNodeName(node.parent)}`);
    infos.push(`parent sourceFile=${node.parent.getSourceFile().fileName}:${node.parent.getStart()}`);
    return infos.join("\n");
};
