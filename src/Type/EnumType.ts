import { BaseType } from "./BaseType";
import { LiteralType } from "./LiteralType";
import { NullType } from "./NullType";

export type EnumValue = string | boolean | number | null;

export class EnumType extends BaseType {
    private types: BaseType[];

    public constructor(private id: string, private values: readonly EnumValue[]) {
        super();
<<<<<<< HEAD
        this.types = values.map(value => (value == null ? new NullType() : new LiteralType(value)));
=======
        this.types = values.map((value) => (value == null ? new NullType() : new LiteralType(value)));
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
    }

    public getId(): string {
        return this.id;
    }

    public getValues(): readonly EnumValue[] {
        return this.values;
    }

    public getTypes(): BaseType[] {
        return this.types;
    }
}
