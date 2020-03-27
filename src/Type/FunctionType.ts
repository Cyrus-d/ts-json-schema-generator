import { BaseType } from "./BaseType";

<<<<<<< HEAD
export class FunctionParameter {
    public constructor(private name: string, private type: BaseType, private required: boolean) {}

    public getName(): string {
        return this.name;
    }
    public getType(): BaseType {
        return this.type;
    }
    public isRequired(): boolean {
        return this.required;
    }
}

export class FunctionType extends BaseType {
    public constructor(
        private id: string,
        private baseTypes: BaseType[],
        private properties: FunctionParameter[],
        private additionalParameters: BaseType | boolean,
        private returnType: BaseType
    ) {
        super();
    }

    public getId(): string {
        return this.id;
    }
    public getReturnType(): BaseType {
        return this.returnType;
    }
    public getBaseTypes(): BaseType[] {
        return this.baseTypes;
    }
    public getParameters(): FunctionParameter[] {
        return this.properties;
    }
    public getAdditionalParameters(): BaseType | boolean {
        return this.additionalParameters;
=======
export class FunctionType extends BaseType {
    public getId() {
        return "function";
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
    }
}
