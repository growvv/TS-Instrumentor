import * as ts from 'typescript';
import { BaseInstrumentor } from './baseInstrumentor';
import { buildAst } from '../utils';


/**
 * LogInstrumentor handles instrumentation of function declarations and expressions.
 */
export class LogInstrumentor extends BaseInstrumentor {

    /**
     * Get the function name or generate an anonymous name.
     * @param node Function-like declaration node.
     */
    getFunctionName(node: ts.FunctionLikeDeclarationBase): string {
        const anonymousName = 'anonymous_' + this.idGenerator.generateFunctionId();
        if (
            ts.isFunctionDeclaration(node) ||
            ts.isMethodDeclaration(node) ||
            ts.isFunctionExpression(node)
        ) {
            return (node.name && ts.isIdentifier(node.name)) ? node.name.text : anonymousName;
        } else if (ts.isArrowFunction(node)) {
            return anonymousName;
        }
        return anonymousName;
    }

    createInstrumentationNodes2(code: string): ts.Statement[] {
        const sourceFile = ts.createSourceFile('instrumentation.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
        return sourceFile.statements.map(stmt => stmt);
    }

    /**
 * Creates AST nodes from a template string.
 * @param code Template code string.
 */
    private createInstrumentationNodes(code: string): ts.Statement[] {
        const sourceFile = ts.createSourceFile(
            'instrumentation.ts',
            code,
            ts.ScriptTarget.Latest,
            true,
            ts.ScriptKind.TS
        );
        return sourceFile.statements.map(stmt => stmt);
    }

    _instrumentFunction(node: ts.FunctionLikeDeclarationBase, factory: ts.NodeFactory): ts.FunctionLikeDeclarationBase {
        // 获取函数名
        const functionName = this.getFunctionName(node);

        const enterLogTemplate = `console.log("Entering function ${functionName}");`;
        const exitLogTemplate = `console.log("Exiting function ${functionName}");`;

        // Parse the templates into AST nodes
        const enterLogNodes = buildAst(enterLogTemplate);
        const exitLogNodes = buildAst(exitLogTemplate);

        if (node.body && ts.isBlock(node.body)) {
            // 插入 enterLog 在函数体开始
            const newStatements = [...enterLogNodes, ...node.body.statements];

            // 遍历函数体中的每个语句，找到 return 语句并在其前插入 exitLog
            const updatedStatements = newStatements.map(stmt => {
                if (ts.isReturnStatement(stmt)) {
                    return factory.createBlock(
                        [...exitLogNodes, stmt],
                        true
                    );
                }
                return stmt;
            });

            // 如果函数没有显式的 return 语句，确保在函数结束时插入 exitLog
            const hasReturn = node.body.statements.some(ts.isReturnStatement);
            if (!hasReturn) {
                updatedStatements.push(...exitLogNodes);
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

    instrumentFunction(node: ts.Node, factory: ts.NodeFactory): ts.Node {
        if (!ts.isFunctionLike(node)) {
            return node;
        }

        return this._instrumentFunction(node as ts.FunctionLikeDeclarationBase, factory);
    }
}