// transformer.ts
import * as ts from 'typescript';
import { BaseInstrumentor } from './Instrumentor/baseInstrumentor';

export class Location {
    line: number | undefined;
    col: number | undefined;

    constructor(line: number, col: number) {
        this.line = line;
        this.col = col;
    }
}
export class Region {
    count: number | undefined;
    startLoc: Location | undefined;
    endLoc: Location | undefined;

    constructor(startLoc: Location, endLoc: Location) {
        this.startLoc = startLoc;
        this.endLoc = endLoc;
        this.count = 0;
    }
}

/**
 * ETS compilation will insert a new node, and there is no corresponding source code location
 * @param node
 * @param fuzz Whether to fuzz the location of the child node
 * @returns
 */
function getSourceRegion(node: ts.Node | undefined, fuzz: boolean = false, sourceFile: ts.SourceFile, context: ts.TransformationContext): Region | undefined {
    if (!node) {
        return;
    }
    if (node.pos < 0 && fuzz) {
        let bak = node;
        let visitor = (_node: ts.Node): ts.VisitResult<ts.Node> => {
            if (_node.pos >= 0) {
                bak = _node;
                return _node;
            }
            return ts.visitEachChild(_node, visitor, context);
        };
        ts.visitEachChild(node, visitor, context);
        node = bak;
    }

    if (node.pos < 0) {
        return;
    }

    let start = ts.getLineAndCharacterOfPosition(sourceFile, node.getStart(sourceFile));

    let end = ts.getLineAndCharacterOfPosition(sourceFile, node.getEnd());

    return new Region(new Location(start.line + 1, start.character + 1), new Location(end.line + 1, end.character + 1));
}

function createInstrumentationTransformer(instrumentors: BaseInstrumentor[]): ts.TransformerFactory<ts.SourceFile> {
    return context => {
        const { factory } = context;
        var count = 0;

        let originSourceFile : ts.SourceFile;

        const visit: ts.Visitor = (node) => {
            let transformedNode: ts.Node = node;
            // debug
            const printer = ts.createPrinter();
            console.log("count: ", count++);
            console.log("node type: ", ts.SyntaxKind[transformedNode.kind]);
            console.log("node pos: ", transformedNode.pos);
            console.log("node end: ", transformedNode.end);
            console.log(printer.printNode(ts.EmitHint.Unspecified, transformedNode, ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest)));

            // // 识别函数声明和函数表达式
            // if (ts.isFunctionDeclaration(node) ||
            //     ts.isFunctionExpression(node) ||
            //     ts.isArrowFunction(node) ||
            //     ts.isMethodDeclaration(node)) {

            //     // 插桩函数
            //     node = instrumentFunction(node, factory);
            // }

            
            if (ts.isSourceFile(transformedNode)) {
                originSourceFile = transformedNode;
            }

            let nodeRegin;
            if (originSourceFile) {
                nodeRegin = getSourceRegion(transformedNode, true, originSourceFile, context);
            }

            console.log("nodeRegin: ", nodeRegin);

            for (const instrumentor of instrumentors) {
                transformedNode = instrumentor.instrumentFunction(transformedNode, factory);
            }

            return ts.visitEachChild(transformedNode, visit, context);
            return transformedNode;
        };

        return (node) => ts.visitNode(node, visit) as ts.SourceFile;
    };
}

export default createInstrumentationTransformer;
