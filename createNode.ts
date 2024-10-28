import * as ts from 'typescript';
import { factory } from 'typescript';

export class Creator {
    /**
     * 
        import { performance } from 'perf_hooks';
        const __performanceData = {
            functions: {},
            loops: {}
        };

        process.on('exit', () => {
            console.log(__performanceData);
        });

     */

    // import { performance } from 'perf_hooks';
    public static createPerfImport(): ts.ImportDeclaration {
        const perfImport = factory.createImportDeclaration(
            undefined,
            factory.createImportClause(
                false,
                undefined,
                factory.createNamedImports([factory.createImportSpecifier(
                    false,
                    undefined,
                    factory.createIdentifier("performance")
                )])
            ),
            factory.createStringLiteral("perf_hooks"),
            undefined
        );
        return perfImport;
    }

    // interface PerformanceData {
    //     functions: {
    //         [key: string]: any;
    //     };
    //     loops: {
    //         [key: string]: any;
    //     };
    // }
    public static createPerformanceDataInterface(): ts.DeclarationStatement {
        const PerformanceDataInterface =
            factory.createInterfaceDeclaration(
                undefined,
                factory.createIdentifier("PerformanceData"),
                undefined,
                undefined,
                [
                    factory.createPropertySignature(
                        undefined,
                        factory.createIdentifier("functions"),
                        undefined,
                        factory.createTypeLiteralNode([factory.createIndexSignature(
                            undefined,
                            [factory.createParameterDeclaration(
                                undefined,
                                undefined,
                                factory.createIdentifier("key"),
                                undefined,
                                factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                                undefined
                            )],
                            factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
                        )])
                    ),
                    factory.createPropertySignature(
                        undefined,
                        factory.createIdentifier("loops"),
                        undefined,
                        factory.createTypeLiteralNode([factory.createIndexSignature(
                            undefined,
                            [factory.createParameterDeclaration(
                                undefined,
                                undefined,
                                factory.createIdentifier("key"),
                                undefined,
                                factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                                undefined
                            )],
                            factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
                        )])
                    )
                ]
            )

        return PerformanceDataInterface;
    }


    // const __performanceData = {
    //     functions: {},
    //     loops: {}
    // };
    public static createPerformanceData(): ts.VariableStatement {
        const performanceData =
            factory.createVariableStatement(
                undefined,
                factory.createVariableDeclarationList(
                    [factory.createVariableDeclaration(
                        factory.createIdentifier("__performanceData"),
                        undefined,
                        factory.createTypeReferenceNode(
                            factory.createIdentifier("PerformanceData"),
                            undefined
                        ),
                        factory.createObjectLiteralExpression(
                            [
                                factory.createPropertyAssignment(
                                    factory.createIdentifier("functions"),
                                    factory.createObjectLiteralExpression(
                                        [],
                                        false
                                    )
                                ),
                                factory.createPropertyAssignment(
                                    factory.createIdentifier("loops"),
                                    factory.createObjectLiteralExpression(
                                        [],
                                        false
                                    )
                                )
                            ],
                            true
                        )
                    )],
                    ts.NodeFlags.Let
                )
            )
        return performanceData
    }

    // process.on('exit', () => {
    //     console.log(__performanceData);
    // });
    public static createExitListener(): ts.ExpressionStatement {
        const exitListener = factory.createExpressionStatement(
            factory.createCallExpression(
                factory.createPropertyAccessExpression(
                    factory.createIdentifier("process"),
                    factory.createIdentifier("on")
                ),
                undefined,
                [factory.createStringLiteral("exit"), factory.createArrowFunction(
                    undefined,
                    undefined,
                    [],
                    undefined,
                    factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                    factory.createBlock([
                        factory.createExpressionStatement(
                            factory.createCallExpression(
                                factory.createPropertyAccessExpression(
                                    factory.createIdentifier("console"),
                                    factory.createIdentifier("log")
                                ),
                                undefined,
                                [factory.createIdentifier("__performanceData")]
                            )
                        )
                    ], true)
                )]
            )
        );
        return exitListener;
    }

    public static createInitStmt(): ts.Statement[] {
        const ititPerfImport = Creator.createPerfImport();
        const performanceDataInterface = Creator.createPerformanceDataInterface();
        const performanceData = Creator.createPerformanceData();
        const initExitListener = Creator.createExitListener();
        return [ititPerfImport, performanceDataInterface, performanceData, initExitListener];
    }


    // if (!__performanceData.functions['functionName']) {
    //   __performanceData.functions['functionName'] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
    // }
    public static createFunctionData(functionName: string): ts.IfStatement {
        const initFunctionData = factory.createIfStatement(
            factory.createPrefixUnaryExpression(
                ts.SyntaxKind.ExclamationToken,
                factory.createElementAccessExpression(
                    factory.createPropertyAccessExpression(
                        factory.createIdentifier('__performanceData'),
                        factory.createIdentifier('functions')
                    ),
                    factory.createStringLiteral(functionName)
                )
            ),
            factory.createBlock([
                factory.createExpressionStatement(
                    factory.createBinaryExpression(
                        factory.createElementAccessExpression(
                            factory.createPropertyAccessExpression(
                                factory.createIdentifier('__performanceData'),
                                factory.createIdentifier('functions')
                            ),
                            factory.createStringLiteral(functionName)
                        ),
                        factory.createToken(ts.SyntaxKind.EqualsToken),
                        factory.createObjectLiteralExpression([
                            factory.createPropertyAssignment(
                                factory.createIdentifier('callCount'),
                                factory.createNumericLiteral(0)
                            ),
                            factory.createPropertyAssignment(
                                factory.createIdentifier('totalTime'),
                                factory.createNumericLiteral(0)
                            ),
                            factory.createPropertyAssignment(
                                factory.createIdentifier('maxTime'),
                                factory.createNumericLiteral(0)
                            ),
                            factory.createPropertyAssignment(
                                factory.createIdentifier('minTime'),
                                factory.createIdentifier('Infinity')
                            )
                        ], false)
                    )
                )
            ], true)
        );
        return initFunctionData;
    }

    // __performanceData.functions['functionName'].callCount += 1;
    public static createIncrementCallCount(functionName: string): ts.ExpressionStatement {
        const incrementCallCount = factory.createExpressionStatement(
            factory.createBinaryExpression(
                factory.createPropertyAccessExpression(
                    factory.createElementAccessExpression(
                        factory.createPropertyAccessExpression(
                            factory.createIdentifier('__performanceData'),
                            factory.createIdentifier('functions')
                        ),
                        factory.createStringLiteral(functionName)
                    ),
                    factory.createIdentifier('callCount')
                ),
                factory.createToken(ts.SyntaxKind.PlusEqualsToken),
                factory.createNumericLiteral(1)
            )
        );
        return incrementCallCount;
    }

    // const startTimeVar = factory.createUniqueName('__call_start');
    // const __call_start = performance.now();
    public static createBeginFunctionLog(startTimeVar: ts.Identifier): ts.VariableStatement {
        const startStatement = factory.createVariableStatement(
            undefined,
            factory.createVariableDeclarationList([
                factory.createVariableDeclaration(
                    startTimeVar,
                    undefined,
                    undefined,
                    factory.createCallExpression(
                        factory.createPropertyAccessExpression(
                            factory.createIdentifier('performance'),
                            factory.createIdentifier('now')
                        ),
                        undefined,
                        []
                    )
                )
            ], ts.NodeFlags.Const)
        );
        return startStatement;
    }

    // let _loop_i = 0;
    public static createLoopCounter(): ts.VariableStatement {
        const loopCounter =
            factory.createVariableStatement(
                undefined,
                factory.createVariableDeclarationList(
                    [factory.createVariableDeclaration(
                        factory.createIdentifier("_loop_i"),
                        undefined,
                        undefined,
                        factory.createNumericLiteral("0")
                    )],
                    ts.NodeFlags.Let
                )
            )
        return loopCounter;
    }


    // if (!__performanceData.loops['loopId']) {
    //   __performanceData.loops['loopId'] = { iterationCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
    // }
    public static createLoopData(loopId: string): ts.IfStatement {
        const initLoopData = factory.createIfStatement(
            factory.createPrefixUnaryExpression(
                ts.SyntaxKind.ExclamationToken,
                factory.createElementAccessExpression(
                    factory.createPropertyAccessExpression(
                        factory.createIdentifier('__performanceData'),
                        factory.createIdentifier('loops')
                    ),
                    factory.createStringLiteral(loopId)
                )
            ),
            factory.createBlock([
                factory.createExpressionStatement(
                    factory.createBinaryExpression(
                        factory.createElementAccessExpression(
                            factory.createPropertyAccessExpression(
                                factory.createIdentifier('__performanceData'),
                                factory.createIdentifier('loops')
                            ),
                            factory.createStringLiteral(loopId)
                        ),
                        factory.createToken(ts.SyntaxKind.EqualsToken),
                        factory.createObjectLiteralExpression([
                            factory.createPropertyAssignment(
                                factory.createIdentifier('iterationCount'),
                                factory.createNumericLiteral(0)
                            ),
                            factory.createPropertyAssignment(
                                factory.createIdentifier('totalTime'),
                                factory.createNumericLiteral(0)
                            ),
                            factory.createPropertyAssignment(
                                factory.createIdentifier('maxTime'),
                                factory.createNumericLiteral(0)
                            ),
                            factory.createPropertyAssignment(
                                factory.createIdentifier('minTime'),
                                factory.createIdentifier('Infinity')
                            )
                        ], false)
                    )
                )
            ], true)
        );
        return initLoopData;
    }

    // 插入代码：__performanceData.loops['loopId'].iterationCount += 1;
    public static createIncrementIteration(loopId: string): ts.ExpressionStatement {
        const incrementIteration = factory.createExpressionStatement(
            factory.createBinaryExpression(
                factory.createPropertyAccessExpression(
                    factory.createElementAccessExpression(
                        factory.createPropertyAccessExpression(
                            factory.createIdentifier('__performanceData'),
                            factory.createIdentifier('loops')
                        ),
                        factory.createStringLiteral(loopId)
                    ),
                    factory.createIdentifier('iterationCount')
                ),
                factory.createToken(ts.SyntaxKind.PlusEqualsToken),
                factory.createNumericLiteral(1)
            )
        );
        return incrementIteration;
    }



    // 插入代码：
    // const __end = performance.now();
    // const __duration = __end - __start;
    // __performanceData.functions['functionName'].totalTime += __duration;
    // __performanceData.functions['functionName'].maxTime = Math.max(__performanceData.functions['functionName'].maxTime, __duration);
    // __performanceData.functions['functionName'].minTime = Math.min(__performanceData.functions['functionName'].minTime, __duration);
    public static createEndFunctionLog(functionName: string, startTimeVar: ts.Identifier, endTimeVar: ts.Identifier): ts.Statement[] {
        // const startTimeVar = factory.createUniqueName('__loop_start');
        const durationVar = factory.createUniqueName('__duration');
        const endStatements = [
            factory.createVariableStatement(
                undefined,
                factory.createVariableDeclarationList([
                    factory.createVariableDeclaration(
                        endTimeVar,
                        undefined,
                        undefined,
                        factory.createCallExpression(
                            factory.createPropertyAccessExpression(
                                factory.createIdentifier('performance'),
                                factory.createIdentifier('now')
                            ),
                            undefined,
                            []
                        )
                    )
                ], ts.NodeFlags.Const)
            ),
            factory.createVariableStatement(
                undefined,
                factory.createVariableDeclarationList([
                    factory.createVariableDeclaration(
                        durationVar,
                        undefined,
                        undefined,
                        factory.createBinaryExpression(
                            endTimeVar,
                            factory.createToken(ts.SyntaxKind.MinusToken),
                            startTimeVar
                        )
                    )
                ], ts.NodeFlags.Const)
            ),
            factory.createExpressionStatement(
                factory.createBinaryExpression(
                    factory.createPropertyAccessExpression(
                        factory.createElementAccessExpression(
                            factory.createPropertyAccessExpression(
                                factory.createIdentifier('__performanceData'),
                                factory.createIdentifier('functions')
                            ),
                            factory.createStringLiteral(functionName)
                        ),
                        factory.createIdentifier('totalTime')
                    ),
                    factory.createToken(ts.SyntaxKind.PlusEqualsToken),
                    durationVar
                )
            ),
            factory.createExpressionStatement(
                factory.createBinaryExpression(
                    factory.createPropertyAccessExpression(
                        factory.createElementAccessExpression(
                            factory.createPropertyAccessExpression(
                                factory.createIdentifier('__performanceData'),
                                factory.createIdentifier('functions')
                            ),
                            factory.createStringLiteral(functionName)
                        ),
                        factory.createIdentifier('maxTime')
                    ),
                    factory.createToken(ts.SyntaxKind.EqualsToken),
                    factory.createCallExpression(
                        factory.createPropertyAccessExpression(
                            factory.createIdentifier('Math'),
                            factory.createIdentifier('max')
                        ),
                        undefined,
                        [
                            factory.createPropertyAccessExpression(
                                factory.createElementAccessExpression(
                                    factory.createPropertyAccessExpression(
                                        factory.createIdentifier('__performanceData'),
                                        factory.createIdentifier('functions')
                                    ),
                                    factory.createStringLiteral(functionName)
                                ),
                                factory.createIdentifier('maxTime')
                            ),
                            durationVar
                        ]
                    )
                )
            ),
            factory.createExpressionStatement(
                factory.createBinaryExpression(
                    factory.createPropertyAccessExpression(
                        factory.createElementAccessExpression(
                            factory.createPropertyAccessExpression(
                                factory.createIdentifier('__performanceData'),
                                factory.createIdentifier('functions')
                            ),
                            factory.createStringLiteral(functionName)
                        ),
                        factory.createIdentifier('minTime')
                    ),
                    factory.createToken(ts.SyntaxKind.EqualsToken),
                    factory.createCallExpression(
                        factory.createPropertyAccessExpression(
                            factory.createIdentifier('Math'),
                            factory.createIdentifier('min')
                        ),
                        undefined,
                        [
                            factory.createPropertyAccessExpression(
                                factory.createElementAccessExpression(
                                    factory.createPropertyAccessExpression(
                                        factory.createIdentifier('__performanceData'),
                                        factory.createIdentifier('functions')
                                    ),
                                    factory.createStringLiteral(functionName)
                                ),
                                factory.createIdentifier('minTime')
                            ),
                            durationVar
                        ]
                    )
                )
            )
        ];

        return endStatements;
    }

}