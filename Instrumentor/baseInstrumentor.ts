import * as ts from 'typescript';

export abstract class BaseInstrumentor {

    abstract instrumentFunction(node: ts.Node, factory: ts.NodeFactory): ts.Node;
}