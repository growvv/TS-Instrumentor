import * as ts from 'typescript';
import { BaseInstrumentor } from './baseInstrumentor';
import { buildAst } from '../utils';
import { getHash } from '../utils';

export class LogInstrumentor extends BaseInstrumentor {

    private getFunctionName(node: ts.FunctionLikeDeclarationBase): string {
        if (ts.isFunctionDeclaration(node) ||
            ts.isMethodDeclaration(node) ||
            ts.isFunctionExpression(node)) {
            return (node.name && ts.isIdentifier(node.name)) ? node.name.text : getHash(node.getText());
        } else if (ts.isArrowFunction(node)) {
            return getHash(node.getText());
        }
        return getHash(node.getText());
    }

    private _instrumentFunction(node: ts.FunctionLikeDeclarationBase, factory: ts.NodeFactory): ts.FunctionLikeDeclarationBase {
        // 获取函数名
        const functionName = this.getFunctionName(node);

        const enterLogTemplate = `console.log("[LOG] Entering function ${functionName}");`;
        const exitLogTemplate = `console.log("[LOG] Exiting function ${functionName}");`;

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

    private isPatchedNode(node: ts.Node): boolean {
        return node.pos < 0 && node.end < 0;
    }

    public instrumentFunction(node: ts.Node, factory: ts.NodeFactory): ts.Node {
        if (!ts.isFunctionLike(node)) {
            return node;
        }

        // 如果node是插桩过的节点，直接返回
        if (this.isPatchedNode(node)) {
            return node;
        }

        return this._instrumentFunction(node as ts.FunctionLikeDeclarationBase, factory);
    }
}