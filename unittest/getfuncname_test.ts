import { get } from 'http';
import * as ts from 'typescript';
import { factory } from 'typescript';

function getFunctionName(node: ts.CallExpression): string {
    if (ts.isIdentifier(node.expression)) {
        return node.expression.text;
    } else if (ts.isPropertyAccessExpression(node.expression)) {
        // node.expression is ThisKeyword
        if (node.expression.expression.kind === ts.SyntaxKind.ThisKeyword) {
            return 'this.' + node.expression.name.text;
        } else {
            return getFunctionName(node.expression as unknown as ts.CallExpression) + '.' + node.expression.name.text;
        }
    }
    return "anonymous_";
}

// add(1,2)
const addCall = factory.createCallExpression(
    factory.createIdentifier('add'),
    undefined,
    [factory.createNumericLiteral(1), factory.createNumericLiteral(2)]
);

// console.log("begin call add")
const logCall = factory.createCallExpression(
    factory.createPropertyAccessExpression(
        factory.createIdentifier('console'),
        factory.createIdentifier('log')
    ),
    undefined,
    [factory.createStringLiteral(`begin call 1`)]
);

// a.b.c()
const abcCall = factory.createCallExpression(
    factory.createPropertyAccessExpression(
        factory.createPropertyAccessExpression(
            factory.createIdentifier('a'),
            factory.createIdentifier('b')
        ),
        factory.createIdentifier('c')
    ),
    undefined,
    []
);

// this.add(1, 2);
const thisAddCall = factory.createCallExpression(
    factory.createPropertyAccessExpression(
        factory.createThis(),
        factory.createIdentifier('add')
    ),
    undefined,
    [factory.createNumericLiteral(1), factory.createNumericLiteral(2)]
);

// this.add.call(this, 1, 2);
const thisAddCall2 = factory.createCallExpression(
    factory.createPropertyAccessExpression(
        factory.createPropertyAccessExpression(
            factory.createThis(),
            factory.createIdentifier('add')
        ),
        factory.createIdentifier('call')
    ),
    undefined,
    [factory.createThis(), factory.createNumericLiteral(1), factory.createNumericLiteral(2)]
);

console.log(getFunctionName(addCall));
console.log(getFunctionName(logCall));
console.log(getFunctionName(abcCall));
console.log(getFunctionName(thisAddCall));
console.log(getFunctionName(thisAddCall2));
