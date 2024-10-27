// transformer.ts
import * as ts from 'typescript';
import { BaseInstrumentor } from './Instrumentor/baseInstrumentor';

/**
 * 生成唯一的 ID
 */
let functionCounter = 0;

function generateFunctionId(): string {
    return `__func_${++functionCounter}`;
}

/**
 * 从 CallExpression 获取函数名
 * @param node CallExpression 节点
 */
function getFunctionName(node: ts.FunctionLikeDeclarationBase): string {
    const anonymous_name = 'anonymous' + generateFunctionId();
    if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isFunctionExpression(node)) {
        return (node.name && ts.isIdentifier(node.name)) ? node.name.text : anonymous_name;
    } else if (ts.isArrowFunction(node)) {
        return anonymous_name;
    }
    return anonymous_name;
}

/**
 * 创建一个 AST 语句节点数组，从代码字符串
 * @param code 插桩代码字符串
 */
function createInstrumentationNodes(code: string): ts.Statement[] {
    const sourceFile = ts.createSourceFile('instrumentation.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    return sourceFile.statements.map(stmt => stmt);
}


/**
 * 插桩函数声明和表达式
 * @param node 函数节点
 */
function instrumentFunction(node: ts.FunctionLikeDeclarationBase, factory: ts.NodeFactory): ts.FunctionLikeDeclarationBase {
    // 获取函数名
    const functionName = getFunctionName(node);

    // 创建 console.log('Entering function <functionName>');
    const enterLog = factory.createExpressionStatement(
        factory.createCallExpression(
            factory.createPropertyAccessExpression(
                factory.createIdentifier('console'),
                factory.createIdentifier('log')
            ),
            undefined,
            [factory.createStringLiteral("Entering function ${functionName}")]
        )
    );

    // 创建 console.log('Exiting function <functionName>');
    const exitLog = factory.createExpressionStatement(
        factory.createCallExpression(
            factory.createPropertyAccessExpression(
                factory.createIdentifier('console'),
                factory.createIdentifier('log')
            ),
            undefined,
            [factory.createStringLiteral("Exiting function ${functionName}")]
        )
    );


    if (node.body && ts.isBlock(node.body)) {
        // 插入 enterLog 在函数体开始
        const newStatements = [enterLog, ...node.body.statements];

        // 遍历函数体中的每个语句，找到 return 语句并在其前插入 exitLog
        const updatedStatements = newStatements.map(stmt => {
            if (ts.isReturnStatement(stmt)) {
                return factory.createBlock(
                    [exitLog, stmt],
                    true
                );
            }
            return stmt;
        });

        // 如果函数没有显式的 return 语句，确保在函数结束时插入 exitLog
        const hasReturn = node.body.statements.some(ts.isReturnStatement);
        if (!hasReturn) {
            updatedStatements.push(exitLog);
        }

        // 创建新的函数体
        const newBody = factory.updateBlock(node.body, updatedStatements);

        // 根据函数类型，返回更新后的节点
        if (ts.isFunctionDeclaration(node)) {
            return factory.updateFunctionDeclaration(
                node,
                node.modifiers,
                node.asteriskToken,
                node.name,
                node.typeParameters,
                node.parameters,
                node.type,
                newBody
            );
        } else if (ts.isFunctionExpression(node)) {
            return factory.updateFunctionExpression(
                node,
                node.modifiers,
                node.asteriskToken,
                node.name,
                node.typeParameters,
                node.parameters,
                node.type,
                newBody
            );
        } else if (ts.isArrowFunction(node)) {
            // 对于箭头函数，保持语法正确性
            return factory.updateArrowFunction(
                node,
                node.modifiers,
                node.typeParameters,
                node.parameters,
                node.type,
                node.equalsGreaterThanToken,
                newBody
            );
        } else if (ts.isMethodDeclaration(node)) {
            return factory.updateMethodDeclaration(
                node,
                node.modifiers,
                node.asteriskToken,
                node.name,
                node.questionToken,
                node.typeParameters,
                node.parameters,
                node.type,
                newBody
            );
        }
    }

    return node;
}

/**
 * 创建性能插桩的转换器
 */
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
                // node update in place
                // node.update(instrumentor.instrumentFunction(node, factory));
            }

            return ts.visitEachChild(transformedNode, visit, context);
            return transformedNode;
        };

        return (node) => ts.visitNode(node, visit) as ts.SourceFile;
    };
}

export default createInstrumentationTransformer;
