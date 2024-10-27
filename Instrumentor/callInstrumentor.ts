import * as ts from 'typescript';
import { BaseInstrumentor } from './baseInstrumentor';
import { buildAst } from '../utils';

/**
 * CallInstrumentor handles instrumentation of function calls.
 */
export class CallInstrumentor extends BaseInstrumentor {

    /**
     * Get the function name from a CallExpression.
     * @param node CallExpression node.
     */
    getFunctionName(node: ts.CallExpression): string {
        if (ts.isIdentifier(node.expression)) {
            return node.expression.text;
        } else if (ts.isPropertyAccessExpression(node.expression)) {
            // return node.expression.getText();
            return node.expression.name.text;
        }
        return 'anonymous_call_' + this.idGenerator.generateCallId();
    }

    /**
     * Create AST nodes from template strings with placeholders.
     * @param code Template code string.
     * @param functionName Name of the function being called.
     */
    createInstrumentationNodes(code: string, functionName: string): ts.Statement[] {
        // Replace placeholder with actual function name
        const filledCode = code.replace('<functionName>', functionName);
        const sourceFile = ts.createSourceFile('instrumentation.ts', filledCode, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
        return sourceFile.statements.map(stmt => stmt);
    }

    EXCLUDED_FUNCTIONS = new Set([
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
        'log',
        // 可以根据需要添加更多排除的函数或变量
    ]);

    shouldInstrumentCall(node: ts.CallExpression): boolean {
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

    createLoggedCallExpression(factory: ts.NodeFactory, functionName: string, node: ts.Node) {
        // Create `console.log`
        const consoleIdentifier = factory.createIdentifier('console');
        ts.setTextRange(consoleIdentifier, node); // Set position for `console`
    
        const logIdentifier = factory.createIdentifier('log');
        ts.setTextRange(logIdentifier, node); // Set position for `log`
    
        const propertyAccess = factory.createPropertyAccessExpression(consoleIdentifier, logIdentifier);
        ts.setTextRange(propertyAccess, node); // Set position for `console.log`
    
        // Create `"begin call <functionName>"`
        const message = factory.createStringLiteral(`begin call ${functionName}`);
        ts.setTextRange(message, node); // Set position for string literal
    
        // Create `console.log("begin call <functionName>")`
        const logCall = factory.createCallExpression(propertyAccess, undefined, [message]);
        ts.setTextRange(logCall, node); // Set position for the `console.log` call expression
    
        // Wrap in an ExpressionStatement: `console.log("begin call <functionName>");`
        const beforeLog = factory.createExpressionStatement(logCall);
        ts.setTextRange(beforeLog, node); // Set position for the entire statement
    
        return beforeLog;
    }


    /**
     * Instrument a function call by adding console.log statements before and after the call.
     * @param node CallExpression node.
     * @param factory Node factory.
     */
    isInstrumented : Map<string, boolean> = new Map();

    _instrumentCall(node: ts.CallExpression, factory: ts.NodeFactory): ts.CallExpression {
        const functionName = this.getFunctionName(node);
        if (this.isInstrumented.get(functionName)) {
            return node;
        }
        this.isInstrumented.set(functionName, true);

        // Create console.log("begin call <functionName>");
        // const beforeLog = factory.createExpressionStatement(
        //     factory.createCallExpression(
        //         factory.createPropertyAccessExpression(
        //             factory.createIdentifier('console'),
        //             factory.createIdentifier('log')
        //         ),
        //         undefined,
        //         [factory.createStringLiteral(`begin call ${functionName}`)]
        //     )
        // );
        const beforeLog = this.createLoggedCallExpression(factory, functionName, node);
        ts.setTextRange(beforeLog, node);  // Set position for beforeLog

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
        ts.setTextRange(afterLog, node);  // Set position for afterLog

        // Create unique result identifier
        const resultVarName = factory.createUniqueName('result');

        // Rebuild CallExpression, ensuring arguments are preserved
        const callExpression = factory.createCallExpression(
            node.expression,
            node.typeArguments,
            node.arguments
        );
        // const callExpression = node;
        ts.setTextRange(callExpression, node);  // Set position for the original call

        // Create const result = originalCall;
        const varDeclaration = factory.createVariableDeclaration(
            resultVarName,
            undefined,
            undefined,
            callExpression
        );
        ts.setTextRange(varDeclaration, node);  // Set position for varDeclaration

        const varDeclList = factory.createVariableDeclarationList(
            [varDeclaration],
            ts.NodeFlags.Const
        );
        const varStmt = factory.createVariableStatement(
            undefined,
            varDeclList
        );
        ts.setTextRange(varStmt, node);  // Set position for variable statement

        // Create return statement: return result;
        const returnStmt = factory.createReturnStatement(resultVarName);
        ts.setTextRange(returnStmt, node);  // Set position for return statement

        // Create function block
        const block = factory.createBlock([beforeLog, varStmt, afterLog, returnStmt], true);
        ts.setTextRange(block, node);  // Set position for block

        // Create IIFE block as function expression or arrow function
        let iife: ts.CallExpression;

        // if (ts.isPropertyAccessExpression(node.expression)) {
        //     // For method calls, use a normal function expression to retain this context
        //     const functionExpression = factory.createFunctionExpression(
        //         undefined, // modifiers
        //         undefined, // asteriskToken
        //         undefined, // name
        //         undefined, // typeParameters
        //         [],        // parameters
        //         undefined, // type
        //         block      // body
        //     );
        //     ts.setTextRange(functionExpression, node);  // Set position for function expression

        //     iife = factory.createCallExpression(
        //         factory.createParenthesizedExpression(functionExpression),
        //         undefined,
        //         []
        //     );
        // } else {
            // For normal function calls, use an arrow function
            const arrowFunction = factory.createArrowFunction(
                undefined,
                undefined,
                [],
                undefined,
                factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                block
            );
            ts.setTextRange(arrowFunction, node);  // Set position for arrow function

            iife = factory.createCallExpression(
                factory.createParenthesizedExpression(arrowFunction),
                undefined,
                []
            );
        // }

        // Set position for the final IIFE
        ts.setTextRange(iife, node);

        // Return the final instrumented IIFE, replacing the original node in the AST
        return iife;
        // return ts.factory.updateCallExpression(node, iife.expression, node.typeArguments, node.arguments);
    }

    INSTRUMENTED_SYMBOL = Symbol("instrumented");

    instrumentFunction(node: ts.Node, factory: ts.NodeFactory): ts.Node {
        if ((node as any)[this.INSTRUMENTED_SYMBOL]) {
            return node;
        }
        (node as any)[this.INSTRUMENTED_SYMBOL] = true;

        if (!ts.isCallExpression(node)) {
            return node;
        }
        if (!this.shouldInstrumentCall(node)) {
            return node;
        }

        const parent = node.parent;
        console.log('node:', node.kind);
        // console.log('parent:', parent.kind);

        let updatedNode: ts.Node;

        const instrumentedCall = this._instrumentCall(node, factory);
        ts.setTextRange(instrumentedCall, { pos: node.pos, end: node.end }); // Preserve source positionssource positions for instrumented node

        // if (ts.isExpressionStatement(parent)) {
        //     // 情况一：独立的 ExpressionStatement，如 add(a, b);
        //     // const iife = this._instrumentCall(node, factory);
        //     // ts.factory.updateCallExpression
        //     updatedNode = instrumentedCall;
        // } else if (ts.isVariableDeclaration(parent)) {
        //     // 情况二：赋值表达式，如 let c = add(a, b);
        //     const instrumentedCall = this._instrumentCall(node, factory);
        //     updatedNode = factory.updateVariableDeclaration(
        //         parent,
        //         parent.name,
        //         parent.exclamationToken,
        //         parent.type,
        //         instrumentedCall
        //     );
        //     ts.setTextRange(updatedNode, parent);
        // } else {
        //     // 情况三：嵌套调用，如 add(1, add(2, 3));
        //     // 直接替换内部的 CallExpression 为 IIFE
        //     // const instrumentedCall =  this._instrumentCall(node, factory);
        //     updatedNode = instrumentedCall;
        // }
        // ts.setTextRange(updatedNode, { pos: node.pos, end: node.end });
        return instrumentedCall;
    }
}