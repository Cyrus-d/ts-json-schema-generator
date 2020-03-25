import { Config } from "../Config";

export const hasLimitOptions = (config?: Config) => {
    if (!config) return false;
    if (config.excludeProperties && config.excludeProperties.length) return true;
    if (config.includeProperties && config.includeProperties.length) return true;
    if (config.maxDepth) return true;
    return false;
};
