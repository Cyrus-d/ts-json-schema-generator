import { assertValidSchema } from "./utils";

describe("valid-data-type", () => {
    it("my-data", assertValidSchema("my-data", "MyType"));
});
