import { Creator } from '../createNode';
import * as ts from 'typescript';

// const creator = new Creator();

const printer = ts.createPrinter();
const perfImport = Creator.createPerfImport();
const perfDataInterface = Creator.createPerformanceDataInterface();
const performanceData = Creator.createPerformanceData();
const exitListener = Creator.createExitListener();
const functionData = Creator.createFunctionData("add");
const incrementCallCount = Creator.createIncrementCallCount("add");
// startTimeVar: ts.Identifier
let startTimeVar = ts.factory.createIdentifier("__call_start_add");
const beginFunctionLog = Creator.createBeginFunctionLog(startTimeVar);
const loopData = Creator.createLoopData("1");
const incrementIteration = Creator.createIncrementIteration("1");
const endFunctionLog = Creator.createEndFunctionLog("add", startTimeVar);


console.log(printer.printNode(ts.EmitHint.Unspecified, perfImport, ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest)));
console.log(printer.printNode(ts.EmitHint.Unspecified, perfDataInterface, ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest)));
console.log(printer.printNode(ts.EmitHint.Unspecified, performanceData, ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest)));
console.log(printer.printNode(ts.EmitHint.Unspecified, exitListener, ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest)));
console.log(printer.printNode(ts.EmitHint.Unspecified, functionData, ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest)));
console.log(printer.printNode(ts.EmitHint.Unspecified, incrementCallCount, ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest)));
console.log(printer.printNode(ts.EmitHint.Unspecified, beginFunctionLog, ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest)));
console.log(printer.printNode(ts.EmitHint.Unspecified, loopData, ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest)));
console.log(printer.printNode(ts.EmitHint.Unspecified, incrementIteration, ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest)));
console.log(printer.printNode(ts.EmitHint.Unspecified, endFunctionLog[0], ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest)));