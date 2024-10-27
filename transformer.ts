// transformer.ts
import * as ts from 'typescript';
import { BaseInstrumentor } from './Instrumentor/baseInstrumentor';


function createInstrumentationTransformer(instrumentors: BaseInstrumentor[]): ts.TransformerFactory<ts.SourceFile> {
    return context => {
        const { factory } = context;
        var count = 0;

        const visit: ts.Visitor = (node) => {
            let transformedNode: ts.Node = node;
            // debug
            const printer = ts.createPrinter();
            console.log("count: ", count++);
            console.log("node type: ", ts.SyntaxKind[transformedNode.kind]);
            console.log(printer.printNode(ts.EmitHint.Unspecified, transformedNode, ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest)));

            // // 识别函数声明和函数表达式
            // if (ts.isFunctionDeclaration(node) ||
            //     ts.isFunctionExpression(node) ||
            //     ts.isArrowFunction(node) ||
            //     ts.isMethodDeclaration(node)) {

            //     // 插桩函数
            //     node = instrumentFunction(node, factory);
            // }
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
