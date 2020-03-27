export interface Config {
    path?: string;
    type?: string;
    tsconfig?: string;
    expose: "all" | "none" | "export";
    topRef: boolean;
    jsDoc: "none" | "extended" | "basic";
    sortProps?: boolean;
    strictTuples?: boolean;
    skipTypeCheck?: boolean;
    encodeRefs?: boolean;
    extraTags?: string[];
<<<<<<< HEAD
    setObjectIdentifier?: boolean;
    maxDepth?: number;
    /**
     *   Use this option when parser can parse specific type and throws error, this option force the parser identified type as unknown type.
     */
    handleUnknownTypes?: boolean;
    /**
     *   When unknown type detected, the node info will be displayed.
     */
    showUnknownTypeInfo?: boolean;
    /**
     *   Types located in the file wont be processed, instead name of type will be returned.
     *   e.g. HTMLElement is located in lib.dom.d.ts file, hence the HTMLElement will be the type
     */
    skipParseTypeInFiles?: string[];
    /**
     *   Type names within the list wont be proceeded instead the name of the type will be returned.
     *   e.g. HTMLElement will stay HTMLElement
     */
    skipParseTypes?: string[];
    /**
     *   Names within the list must be processed even if its in skipFiles or skipTypes list
     */
    forceToParseTypes?: string[];
    /**
     *   The generated schema will not have properties with name specified in the list
     */
    excludeProperties?: string[];
    /**
     *   Will only generate schema for the property names included in the list
     */
    includeProperties?: string[];
=======
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
}

export const DEFAULT_CONFIG: Config = {
    expose: "export",
    topRef: true,
    jsDoc: "extended",
    sortProps: true,
    strictTuples: false,
    skipTypeCheck: false,
    encodeRefs: true,
    extraTags: [],
<<<<<<< HEAD
    showUnknownTypeInfo: true,
=======
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
};
