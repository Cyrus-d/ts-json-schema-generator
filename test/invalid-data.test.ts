import { resolve } from "path";
import * as ts from "typescript";
import { createFormatter } from "../factory/formatter";
import { createParser } from "../factory/parser";
import { createProgram } from "../factory/program";
import { Config } from "../src/Config";
import { SchemaGenerator } from "../src/SchemaGenerator";

function assertSchema(name: string, type: string, message: string) {
    return () => {
        const config: Config = {
            path: resolve(`test/invalid-data/${name}/*.ts`),
            type: type,
            expose: "export",
            topRef: true,
            jsDoc: "none",
            skipTypeCheck: !!process.env.FAST_TEST,
        };

        const program: ts.Program = createProgram(config);
        const generator: SchemaGenerator = new SchemaGenerator(
            program,
            createParser(program, config),
            createFormatter(config)
        );

        try {
            generator.createSchema(type);
            expect(true).toBe(false);
        } catch (e) {
            expect((e.message as string).startsWith(message)).toBe(true);
        }
    };
}

describe("invalid-data", () => {
    // TODO: template recursive

    it("script-empty", assertSchema("script-empty", "MyType", `No root type "MyType" found`));
    it("literal-index-type", assertSchema("literal-index-type", "MyType", `Unknown node " ["abc", "def"]`));
    it("literal-array-type", assertSchema("literal-array-type", "MyType", `Unknown node " ["abc", "def"]`));
    it("literal-object-type", assertSchema("literal-object-type", "MyType", `Unknown node " {abc: "def"}`));
    it("duplicates", assertSchema("duplicates", "MyType", `Type "A" has multiple definitions.`));
<<<<<<< HEAD
    it(
        "global-types",
        assertSchema(
            "global-types",
            "MyType",
            `Unknown type reference "GlobalTypes.MyType", are you using global types?`
        )
    );
=======
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
});
