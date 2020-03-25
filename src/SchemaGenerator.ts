import * as ts from "typescript";
import { NoRootTypeError } from "./Error/NoRootTypeError";
import { Context, NodeParser } from "./NodeParser";
import { Definition } from "./Schema/Definition";
import { Schema } from "./Schema/Schema";
import { BaseType } from "./Type/BaseType";
import { DefinitionType } from "./Type/DefinitionType";
import { TypeFormatter } from "./TypeFormatter";
import { StringMap } from "./Utils";
import { localSymbolAtNode, symbolAtNode } from "./Utils/symbolAtNode";
import { notUndefined } from "./Utils/notUndefined";
import { TopRefNodeParser } from "./TopRefNodeParser";
import { ObjectType } from "./Type/ObjectType";
import { FunctionType } from "./Type/FunctionType";
import { Config } from "./Config";

export class SchemaGenerator {
    public constructor(
        private readonly program: ts.Program,
        private readonly nodeParser: NodeParser,
        private readonly typeFormatter: TypeFormatter,
        private readonly config?: Config
    ) {}

    public createSchema(fullName: string | undefined): Schema {
        const rootNodes = this.getRootNodes(fullName);
        return this.createSchemaFromNodes(rootNodes);
    }

    public createSchemaFromNodes(rootNodes: ts.Node[]): Schema {
        const rootTypes = rootNodes
            .map(rootNode => {
                return this.nodeParser.createType(rootNode, new Context());
            })
            .filter(notUndefined);
        const rootTypeDefinition = rootTypes.length === 1 ? this.getRootTypeDefinition(rootTypes[0]) : {};
        const definitions: StringMap<Definition> = {};
        rootTypes.forEach(rootType => this.appendRootChildDefinitions(rootType, definitions));
        delete definitions["*"];
        return { $schema: "http://json-schema.org/draft-07/schema#", ...rootTypeDefinition, definitions };
    }

    private getRootNodes(fullName: string | undefined) {
        if (fullName && fullName !== "*") {
            return [this.findNamedNode(fullName)];
        } else {
            const rootFileNames = this.program.getRootFileNames();
            const rootSourceFiles = this.program
                .getSourceFiles()
                .filter(sourceFile => rootFileNames.includes(sourceFile.fileName));
            const rootNodes = new Map<string, ts.Node>();
            this.appendTypes(rootSourceFiles, this.program.getTypeChecker(), rootNodes);
            return [...rootNodes.values()];
        }
    }
    private findNamedNode(fullName: string): ts.Node {
        const typeChecker = this.program.getTypeChecker();
        const allTypes = new Map<string, ts.Node>();
        const { projectFiles, externalFiles } = this.partitionFiles();

        this.appendTypes(projectFiles, typeChecker, allTypes);

        if (allTypes.has(fullName)) {
            return allTypes.get(fullName)!;
        }

        this.appendTypes(externalFiles, typeChecker, allTypes);

        if (allTypes.has(fullName)) {
            return allTypes.get(fullName)!;
        }

        throw new NoRootTypeError(fullName);
    }
    private getRootTypeDefinition(rootType: BaseType): Definition {
        return this.typeFormatter.getDefinition(rootType);
    }
    private appendRootChildDefinitions(rootType: BaseType, childDefinitions: StringMap<Definition>): void {
        const seen = new Set<string>();

        const children = this.typeFormatter
            .getChildren(rootType)
            .filter((child): child is DefinitionType => child instanceof DefinitionType)
            .filter(child => {
                if (!seen.has(child.getId())) {
                    seen.add(child.getId());
                    return true;
                }
                return false;
            });

        const ids = new Map<string, string>();
        for (const child of children) {
            const name = child.getName();
            const previousId = ids.get(name);
            if (previousId && child.getId() !== previousId) {
                throw new Error(`Type "${name}" has multiple definitions.`);
            }
            ids.set(name, child.getId());
        }

        children.reduce((definitions, child) => {
            const newChild = this.applyLimits(child);
            const name = newChild!.getName();
            if (!(name in definitions)) {
                definitions[name] = this.typeFormatter.getDefinition(newChild!.getType());
            }
            return definitions;
        }, childDefinitions);
    }
    private partitionFiles() {
        const projectFiles = new Array<ts.SourceFile>();
        const externalFiles = new Array<ts.SourceFile>();

        for (const sourceFile of this.program.getSourceFiles()) {
            const destination = sourceFile.fileName.includes("/node_modules/") ? externalFiles : projectFiles;
            destination.push(sourceFile);
        }

        return { projectFiles, externalFiles };
    }
    private appendTypes(
        sourceFiles: readonly ts.SourceFile[],
        typeChecker: ts.TypeChecker,
        types: Map<string, ts.Node>
    ) {
        for (const sourceFile of sourceFiles) {
            this.inspectNode(sourceFile, typeChecker, types);
        }
    }
    private inspectNode(node: ts.Node, typeChecker: ts.TypeChecker, allTypes: Map<string, ts.Node>): void {
        switch (node.kind) {
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ExportAssignment:
                if (this.isGenericType(node as ts.TypeAliasDeclaration)) {
                    return;
                }
                allTypes.set(this.getFullName(node, typeChecker), node);
                break;
            default:
                ts.forEachChild(node, subnode => this.inspectNode(subnode, typeChecker, allTypes));
                break;
        }
    }
    private isExportType(node: ts.Node): boolean {
        const localSymbol = localSymbolAtNode(node);
        return localSymbol ? "exportSymbol" in localSymbol : false;
    }
    private isGenericType(node: ts.TypeAliasDeclaration): boolean {
        return !!(node.typeParameters && node.typeParameters.length > 0);
    }
    private getFullName(node: ts.Node, typeChecker: ts.TypeChecker): string {
        const symbol = symbolAtNode(node)!;
        return typeChecker.getFullyQualifiedName(symbol).replace(/".*"\./, "");
    }

    /*
        My Implementations
    */

    private applyLimits(node: DefinitionType) {
        let newSchema: DefinitionType = node;
        if (this.config && this.config.maxDepth) {
            newSchema = this.applyMaxDepth(node, this.config.maxDepth);
        }
        return newSchema;
    }

    private applyMaxDepth(node: DefinitionType, maxDepth: number, dept = 0) {
        const nodeType = node.getType();

        let props;

        if (nodeType instanceof ObjectType) {
            props = (nodeType as ObjectType).getProperties();
        } else if (nodeType instanceof FunctionType) {
            dept = dept - 1;
            props = (nodeType as FunctionType).getParameters();
        }

        if (!props) return node;

        (node as any).type.properties = [];

        if (dept > maxDepth - 1) {
            return node;
        } else {
            props.forEach((prop: any) => {
                const newNode = this.applyMaxDepth(prop, maxDepth, dept + 1);
                if (newNode) {
                    (node as any).type.properties.push(newNode);
                }
            });
        }
        return node;
    }
    public createSchemaByNodeKind(nodeKinds: ts.SyntaxKind | ts.SyntaxKind[]): Schema | null {
        const typeChecker = this.program.getTypeChecker();

        const nodes = this.getRootNodesByKind(Array.isArray(nodeKinds) ? nodeKinds : [nodeKinds]);

        if (!nodes || !nodes.length) {
            return null;
        }

        let allSchema: Schema = { definitions: {} };

        nodes.forEach(node => {
            const name = this.getFullName(node, typeChecker);
            // hack read more in TopRefNodeParser file
            (this.nodeParser as TopRefNodeParser).setFullName(name);
            const rootType = this.nodeParser.createType(node, new Context());
            const definitions = this.getRootChildDefinitions(rootType!);
            allSchema = {
                ...allSchema,
                definitions: {
                    ...allSchema.definitions,
                    ...definitions,
                },
            };
        });

        return allSchema;
    }

    private getRootNodesByKind(kinds: ts.SyntaxKind[]): ts.Node[] | null {
        const rootNodes = this.getRootNodes("*");

        const nodes = rootNodes.filter(n => this.isExportType(n)).filter(n => kinds.indexOf(n.kind) !== -1);

        return nodes;
    }
    private getRootChildDefinitions(rootType: BaseType): StringMap<Definition> {
        return this.typeFormatter
            .getChildren(rootType)
            .filter(child => child instanceof DefinitionType)
            .reduce(
                (result: StringMap<Definition>, child: DefinitionType) => ({
                    ...result,
                    [child.getName()]: this.typeFormatter.getDefinition(child.getType()),
                }),
                {}
            );
    }
}
