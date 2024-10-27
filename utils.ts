import * as ts from 'typescript';

/**
 * 创建一个 AST 语句节点数组，从代码字符串
 * @param code 插桩代码字符串
 */
export function createInstrumentationNodes(code: string): ts.Statement[] {
    const sourceFile = ts.createSourceFile('instrumentation.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    return sourceFile.statements.map(stmt => stmt);
}

export function buildAst(code: string): ts.NodeArray<ts.Statement> {
    let ast: ts.SourceFile;
    ts.transpileModule(code, {
      compilerOptions: {
        declaration: true,
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
      },
      transformers: {
        before: [
          (context: ts.TransformationContext) => {
            return (node: ts.SourceFile): ts.SourceFile => {
              ast = node;
              function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
                // 目的是递归遍历 AST 节点，并将每个节点的 pos 和 end 属性设置为 -1
                // 这些属性通常用于表示节点在源代码中的位置，通过将它们设为 -1，可以忽略这些位置信息。
                // 该方法可以生成不包含位置信息的 AST，这在代码生成或重构过程中有助于忽略源代码位置的影响
                // @ts-ignore
                node.pos = -1;
                // @ts-ignore
                node.end = -1;
                return ts.visitEachChild(node, visitor, context);
              }

              ts.visitEachChild(node, visitor, context);

              return node;
            };
          },
        ],
      },
    });
    return ast!.statements;
  }
