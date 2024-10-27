import * as ts from 'typescript';
import { BaseInstrumentor } from './baseInstrumentor';


export class CallInstrumentor extends BaseInstrumentor {

    private getFunctionName(node: ts.CallExpression): string {
        if (ts.isIdentifier(node.expression)) {
            return node.expression.text;
        } else if (ts.isPropertyAccessExpression(node.expression)) {
            if (node.expression.expression.kind === ts.SyntaxKind.ThisKeyword) {
                return 'this.' + node.expression.name.text;
            } else {
                return this.getFunctionName(node.expression as unknown as ts.CallExpression) + '.' + node.expression.name.text;
            }
        }
        return 'anonymous_' + this.idGenerator.generateFunctionId();
    }

    private EXCLUDED_FUNCTIONS = new Set([
        'performance.now',
        '__performanceData',
        '__call_start_',
        '__call_end_',
        '__call_duration_',
        '__loop_start_',
        '__loop_end_',
        '__loop_duration_',
        '__coverageData',
        'console.log',
        // 可以根据需要添加更多排除的函数或变量
    ]);

    private shouldInstrumentCall(node: ts.CallExpression): boolean {
        const functionName = this.getFunctionName(node);
        console.log('functionName:', functionName);
        // 排除特定函数的插桩
        for (const excluded of this.EXCLUDED_FUNCTIONS) {
            if (functionName === excluded || functionName.startsWith(excluded + '.')) {
                return false;
            }
        }
        return true;
    }

    // 排除已经插桩过的函数
    private isInstrumented: Map<string, boolean> = new Map();

    // 创建一个 Symbol 用于标记已经插桩过的节点
    INSTRUMENTED_SYMBOL = Symbol("instrumented");

    private _instrumentCall(node: ts.CallExpression, factory: ts.NodeFactory): ts.CallExpression {
        const functionName = this.getFunctionName(node);
        // 节点已插桩 && 函数已插桩 同时满足时，直接返回节点
        if (this.isInstrumented.get(functionName) && (node as any)[this.INSTRUMENTED_SYMBOL]) {
            return node;
        }

        this.isInstrumented.set(functionName, true);
        (node as any)[this.INSTRUMENTED_SYMBOL] = true;

        // Create console.log("begin call <functionName>");
        const beforeLog = factory.createExpressionStatement(
            factory.createCallExpression(
                factory.createPropertyAccessExpression(
                    factory.createIdentifier('console'),
                    factory.createIdentifier('log')
                ),
                undefined,
                [factory.createStringLiteral(`begin call ${functionName}`)]
            )
        );

        // Create console.log("end call <functionName>");
        const afterLog = factory.createExpressionStatement(
            factory.createCallExpression(
                factory.createPropertyAccessExpression(
                    factory.createIdentifier('console'),
                    factory.createIdentifier('log')
                ),
                undefined,
                [factory.createStringLiteral(`end call ${functionName}`)]
            )
        );

        // Create unique result identifier
        const resultVarName = factory.createUniqueName('result');

        // Create const result = originalCall;
        const varDeclaration = factory.createVariableDeclaration(
            resultVarName,
            undefined,
            undefined,
            node
        );

        const varDeclList = factory.createVariableDeclarationList(
            [varDeclaration],
            ts.NodeFlags.Const
        );
        const varStmt = factory.createVariableStatement(
            undefined,
            varDeclList
        );
        const returnStmt = factory.createReturnStatement(resultVarName);

        const block = factory.createBlock([beforeLog, varStmt, afterLog, returnStmt], true);

        const arrowFunction = factory.createArrowFunction(
            undefined,
            undefined,
            [],
            undefined,
            factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            block
        );

        // Immediately Invoked Function Expression (IIFE).
        const iife = factory.createCallExpression(
            factory.createParenthesizedExpression(arrowFunction),
            undefined,
            []
        );

        return iife;
    }

    instrumentFunction(node: ts.Node, factory: ts.NodeFactory): ts.Node {
        if (!ts.isCallExpression(node)) {
            return node;
        }
        if (!this.shouldInstrumentCall(node)) {
            return node;
        }

        return  this._instrumentCall(node, factory);;
    }
}