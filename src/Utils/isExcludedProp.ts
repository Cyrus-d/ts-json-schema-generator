import * as ts from "typescript";
import { Config } from "../Config";
import { getPropsRecursively } from "../Utils";
import { Context } from "../NodeParser";

export const isExcludedProp = (node: ts.Node, config: Config, context: Context) => {
    if (!config.excludeProperties || !config.excludeProperties.length) return false;

    const props = getPropsRecursively(node, context);
    if (!props) return false;

    const path = props?.join(".");

    if (!path || !config.excludeProperties.includes(path)) return false;
    return true;
};
