import * as ts from 'typescript';
import { IDGenerator } from '../IDGenerator';

export abstract class BaseInstrumentor {
    protected idGenerator: IDGenerator;

    constructor(idGenerator: IDGenerator) {
        this.idGenerator = idGenerator;
    }

    // instrumentFunction(node: ts.FunctionLikeDeclarationBase, factory: ts.NodeFactory): ts.FunctionLikeDeclarationBase
    // instrumentCall(node: ts.CallExpression, factory: ts.NodeFactory): ts.ExpressionStatement[] 
    // abstract instrumentFunction(node: ts.FunctionLikeDeclarationBase, factory: ts.NodeFactory): ts.FunctionLikeDeclarationBase;
    // abstract instrumentCall(node: ts.CallExpression, factory: ts.NodeFactory): ts.ExpressionStatement[];
    abstract instrumentFunction(node: ts.Node, factory: ts.NodeFactory): ts.Node;
    // abstract visit(node: ts.Node, factory: ts.NodeFactory, context: ts.TransformationContext): ts.Node;
}