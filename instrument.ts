// transformerRunner.ts
import * as ts from 'typescript';
import * as fs from 'fs';
import createInstrumentationTransformer from './transformer';
import { LogInstrumentor } from './Instrumentor/logInstrumentor';
import { CallInstrumentor } from './Instrumentor/callInstrumentor';
import { IDGenerator } from './IDGenerator';


// 获取命令行参数
const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];

if (!inputFilePath || !outputFilePath) {
    console.error('Usage: ts-node transformerRunner.ts <inputFile> <outputFile>');
    process.exit(1);
}

// 读取输入文件内容
const inputCode = fs.readFileSync(inputFilePath, 'utf-8');

// 创建 SourceFile
const sourceFile = ts.createSourceFile(
    inputFilePath,
    inputCode,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
);

// 创建 Transformer
const transformer = createInstrumentationTransformer([
  new LogInstrumentor(new IDGenerator()),
  new CallInstrumentor(new IDGenerator())
]);

// 应用转换器
const result = ts.transform(sourceFile, [transformer]);

// 获取 transformed SourceFile
const transformedSourceFile = result.transformed[0];

// 创建 Printer
const printer = ts.createPrinter();

// 打印 transformed code
const transformedCode = printer.printFile(transformedSourceFile);

// 写入输出文件
fs.writeFileSync(outputFilePath, transformedCode, 'utf-8');

console.log(`Transformed code written to ${outputFilePath}`);
