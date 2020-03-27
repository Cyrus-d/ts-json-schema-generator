import * as ts from "typescript";
import { BasicAnnotationsReader } from "../src/AnnotationsReader/BasicAnnotationsReader";
import { ExtendedAnnotationsReader } from "../src/AnnotationsReader/ExtendedAnnotationsReader";
import { ChainNodeParser } from "../src/ChainNodeParser";
import { CircularReferenceNodeParser } from "../src/CircularReferenceNodeParser";
import { Config } from "../src/Config";
import { ExposeNodeParser } from "../src/ExposeNodeParser";
import { NodeParser } from "../src/NodeParser";
import { AnnotatedNodeParser } from "../src/NodeParser/AnnotatedNodeParser";
import { AnyTypeNodeParser } from "../src/NodeParser/AnyTypeNodeParser";
import { ArrayNodeParser } from "../src/NodeParser/ArrayNodeParser";
import { BooleanLiteralNodeParser } from "../src/NodeParser/BooleanLiteralNodeParser";
import { BooleanTypeNodeParser } from "../src/NodeParser/BooleanTypeNodeParser";
import { CallExpressionParser } from "../src/NodeParser/CallExpressionParser";
import { ConditionalTypeNodeParser } from "../src/NodeParser/ConditionalTypeNodeParser";
import { EnumNodeParser } from "../src/NodeParser/EnumNodeParser";
import { ExpressionWithTypeArgumentsNodeParser } from "../src/NodeParser/ExpressionWithTypeArgumentsNodeParser";
<<<<<<< HEAD
import { FunctionNodeParser } from "../src/NodeParser/FunctionNodeParser";
=======
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
import { HiddenNodeParser } from "../src/NodeParser/HiddenTypeNodeParser";
import { IndexedAccessTypeNodeParser } from "../src/NodeParser/IndexedAccessTypeNodeParser";
import { InterfaceAndClassNodeParser } from "../src/NodeParser/InterfaceAndClassNodeParser";
import { IntersectionNodeParser } from "../src/NodeParser/IntersectionNodeParser";
import { LiteralNodeParser } from "../src/NodeParser/LiteralNodeParser";
import { MappedTypeNodeParser } from "../src/NodeParser/MappedTypeNodeParser";
import { NeverTypeNodeParser } from "../src/NodeParser/NeverTypeNodeParser";
import { NullLiteralNodeParser } from "../src/NodeParser/NullLiteralNodeParser";
import { NumberLiteralNodeParser } from "../src/NodeParser/NumberLiteralNodeParser";
import { NumberTypeNodeParser } from "../src/NodeParser/NumberTypeNodeParser";
import { ObjectTypeNodeParser } from "../src/NodeParser/ObjectTypeNodeParser";
import { OptionalTypeNodeParser } from "../src/NodeParser/OptionalTypeNodeParser";
import { ParenthesizedNodeParser } from "../src/NodeParser/ParenthesizedNodeParser";
import { PrefixUnaryExpressionNodeParser } from "../src/NodeParser/PrefixUnaryExpressionNodeParser";
import { RestTypeNodeParser } from "../src/NodeParser/RestTypeNodeParser";
import { StringLiteralNodeParser } from "../src/NodeParser/StringLiteralNodeParser";
import { StringTypeNodeParser } from "../src/NodeParser/StringTypeNodeParser";
import { TupleNodeParser } from "../src/NodeParser/TupleNodeParser";
import { TypeAliasNodeParser } from "../src/NodeParser/TypeAliasNodeParser";
import { TypeLiteralNodeParser } from "../src/NodeParser/TypeLiteralNodeParser";
import { TypeofNodeParser } from "../src/NodeParser/TypeofNodeParser";
import { TypeOperatorNodeParser } from "../src/NodeParser/TypeOperatorNodeParser";
import { TypeReferenceNodeParser } from "../src/NodeParser/TypeReferenceNodeParser";
import { UndefinedTypeNodeParser } from "../src/NodeParser/UndefinedTypeNodeParser";
import { UnionNodeParser } from "../src/NodeParser/UnionNodeParser";
<<<<<<< HEAD
import { VoidKeywordTypeParser } from "../src/NodeParser/VoidKeywordTypeParser";
=======
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
import { UnknownTypeNodeParser } from "../src/NodeParser/UnknownTypeNodeParser";
import { VoidTypeNodeParser } from "../src/NodeParser/VoidTypeNodeParser";
import { SubNodeParser } from "../src/SubNodeParser";
import { TopRefNodeParser } from "../src/TopRefNodeParser";
<<<<<<< HEAD
import { SkippedFileTypeParser } from "../src/NodeParser/SkippedFileTypeParser";
import { SkippedTypeParser } from "../src/NodeParser/SkippedTypeParser";
import { NotKnownNodeParser } from "../src/NodeParser/NotKnownNodeParser";
import { RecursionTypeParser } from "../src/RecursionTypeParser";
=======
import { FunctionNodeParser } from "./../src/NodeParser/FunctionNodeParser";
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

export function createParser(program: ts.Program, config: Config): NodeParser {
    const typeChecker = program.getTypeChecker();
    const chainNodeParser = new ChainNodeParser(typeChecker, [], config);

    function withExpose(nodeParser: SubNodeParser): SubNodeParser {
        return new ExposeNodeParser(typeChecker, nodeParser, config);
    }
    function withTopRef(nodeParser: NodeParser): NodeParser {
        return new TopRefNodeParser(chainNodeParser, config.type!, config.topRef);
    }
    function withJsDoc(nodeParser: SubNodeParser): SubNodeParser {
        const extraTags = new Set(config.extraTags);
        if (config.jsDoc === "extended") {
            return new AnnotatedNodeParser(nodeParser, new ExtendedAnnotationsReader(typeChecker, extraTags));
        } else if (config.jsDoc === "basic") {
            return new AnnotatedNodeParser(nodeParser, new BasicAnnotationsReader(extraTags));
        } else {
            return nodeParser;
        }
    }
    function withCircular(nodeParser: SubNodeParser): SubNodeParser {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return new CircularReferenceNodeParser(nodeParser, config);
    }

    chainNodeParser
<<<<<<< HEAD
        // the following parser must stay at top
        .addNodeParser(new SkippedTypeParser(config))
        .addNodeParser(new HiddenNodeParser(typeChecker))
        .addNodeParser(new RecursionTypeParser(typeChecker, chainNodeParser, config))
=======
        .addNodeParser(new HiddenNodeParser(typeChecker))
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
        .addNodeParser(new StringTypeNodeParser())
        .addNodeParser(new NumberTypeNodeParser())
        .addNodeParser(new BooleanTypeNodeParser())
        .addNodeParser(new AnyTypeNodeParser())
        .addNodeParser(new UnknownTypeNodeParser())
        .addNodeParser(new VoidTypeNodeParser())
        .addNodeParser(new UndefinedTypeNodeParser())
        .addNodeParser(new NeverTypeNodeParser())
        .addNodeParser(new ObjectTypeNodeParser())

        .addNodeParser(new StringLiteralNodeParser())
        .addNodeParser(new NumberLiteralNodeParser())
        .addNodeParser(new BooleanLiteralNodeParser())
        .addNodeParser(new NullLiteralNodeParser())
        .addNodeParser(new FunctionNodeParser())

        .addNodeParser(new PrefixUnaryExpressionNodeParser(chainNodeParser))

        .addNodeParser(new PrefixUnaryExpressionNodeParser(chainNodeParser))

        .addNodeParser(new LiteralNodeParser(chainNodeParser))
        .addNodeParser(new ParenthesizedNodeParser(chainNodeParser))

        .addNodeParser(new TypeReferenceNodeParser(typeChecker, chainNodeParser))
        .addNodeParser(new ExpressionWithTypeArgumentsNodeParser(typeChecker, chainNodeParser))

        .addNodeParser(new IndexedAccessTypeNodeParser(chainNodeParser))
<<<<<<< HEAD
        .addNodeParser(new TypeofNodeParser(typeChecker, chainNodeParser, config))
        .addNodeParser(new MappedTypeNodeParser(chainNodeParser, config))
=======
        .addNodeParser(new TypeofNodeParser(typeChecker, chainNodeParser))
        .addNodeParser(new MappedTypeNodeParser(chainNodeParser))
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e
        .addNodeParser(new ConditionalTypeNodeParser(typeChecker, chainNodeParser))
        .addNodeParser(new TypeOperatorNodeParser(chainNodeParser))

        .addNodeParser(new UnionNodeParser(typeChecker, chainNodeParser, config))
        .addNodeParser(new IntersectionNodeParser(typeChecker, chainNodeParser))
        .addNodeParser(new TupleNodeParser(typeChecker, chainNodeParser))
        .addNodeParser(new OptionalTypeNodeParser(chainNodeParser))
        .addNodeParser(new RestTypeNodeParser(chainNodeParser))

        .addNodeParser(new CallExpressionParser(typeChecker, chainNodeParser))

<<<<<<< HEAD
        .addNodeParser(
            withCircular(withExpose(withJsDoc(new TypeAliasNodeParser(typeChecker, chainNodeParser, config))))
        )
        .addNodeParser(withExpose(withJsDoc(new EnumNodeParser(typeChecker, config))))
        .addNodeParser(
            withCircular(
                withExpose(withJsDoc(new InterfaceAndClassNodeParser(typeChecker, withJsDoc(chainNodeParser), config)))
            )
        )
        .addNodeParser(
            withCircular(withExpose(withJsDoc(new TypeLiteralNodeParser(withJsDoc(chainNodeParser), config))))
        )

        .addNodeParser(
            withCircular(withExpose(withJsDoc(new FunctionNodeParser(typeChecker, withJsDoc(chainNodeParser)))))
        )

        .addNodeParser(new FunctionNodeParser(typeChecker, withJsDoc(chainNodeParser)))

        .addNodeParser(new VoidKeywordTypeParser())

        .addNodeParser(new ArrayNodeParser(chainNodeParser))

        .addNodeParser(new SkippedFileTypeParser(config))
        // the following parser must always be last
        .addNodeParser(new NotKnownNodeParser(config));
=======
        .addNodeParser(withCircular(withExpose(withJsDoc(new TypeAliasNodeParser(typeChecker, chainNodeParser)))))
        .addNodeParser(withExpose(withJsDoc(new EnumNodeParser(typeChecker))))
        .addNodeParser(
            withCircular(
                withExpose(withJsDoc(new InterfaceAndClassNodeParser(typeChecker, withJsDoc(chainNodeParser))))
            )
        )
        .addNodeParser(withCircular(withExpose(withJsDoc(new TypeLiteralNodeParser(withJsDoc(chainNodeParser))))))

        .addNodeParser(new ArrayNodeParser(chainNodeParser));
>>>>>>> ac96066ddc18eda5845872f71f4e0a51ec689b5e

    return withTopRef(chainNodeParser);
}
