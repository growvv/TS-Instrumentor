# 🔧 TypeScript Instrumentation Tool

Welcome to the **TypeScript Instrumentation Tool**! This project leverages TypeScript’s Compiler API to parse TypeScript code into an Abstract Syntax Tree (AST), enabling you to **instrument** your code with logging and performance measurement tools easily.

---

## ✨ Features

### 1. AST Manipulation
With the TypeScript Compiler API, this project converts TypeScript code into an AST (Abstract Syntax Tree). Using this, we can modify, add, or remove nodes within the AST to suit various instrumenting needs. The project provides a framework to insert instrumentation code dynamically by navigating and modifying AST nodes.

### 2. Instrumentation Tools
This project implements two key instrumentation tools:

#### 🔹 `logInstrumentor`
This tool automatically adds logging statements at:
- **Function Entry**: Logs the function name and input parameters when a function is called.
- **Function Return**: Logs the return value (if applicable) when a function exits.

#### 🔹 `perfInstrumentor`
This instrumentor measures and logs performance data, providing insights into the execution time and efficiency of the following structures:
- **Function Calls**: Logs the time taken by each function call.
- **Loops**: Measures the execution time of `for`, `for-in`, `for-of`, `while`, and other loop constructs.

---

## 🔍 Example

Let’s take a look at a simple example of how instrumentation works with this tool.

### Original Code
```typescript
function add(a: number, b: number): number {
    return a + b;
}

for (let i = 0; i < 10; i++) {
    add(1, 2);
}
```

### Instrumented Code
```typescript
// Simplified version
function add(a: number, b: number): number {
    console.log("[LOG] Entering function add");
    {
        console.log("[LOG] Exiting function add");
        return a + b;
    }
}
for (let i = 0; i < 10; i++) {
    __performanceData.loops["for_a190ec24"].iterationCount += 1;
    {
        (() => {
            console.log("[PREF] begin call add");
            __performanceData.functions["add"].callCount += 1;
            const __call_start_add_1 = performance.now();

            const result_1 = add(1, 2);

            const __call_end_add_1 = performance.now();
            const __duration_1 = __call_end_add_1 - __call_start_add_1;
            __performanceData.functions["add"].totalTime += __duration_1;
            __performanceData.functions["add"].maxTime = Math.max(__performanceData.functions["add"].maxTime, __duration_1);
            __performanceData.functions["add"].minTime = Math.min(__performanceData.functions["add"].minTime, __duration_1);
            console.log("[PREF] end call add");
            return result_1;
        })();
    }
}

```

output:
```bash
// Simplified version
[PREF] begin call add
[LOG] Entering function add
[LOG] Exiting function add
[PREF] end call add
{
  functions: {
    add: {
      callCount: 10,
      totalTime: 0.6925830841064453,
      maxTime: 0.14491599798202515,
      minTime: 0.01325005292892456
    }
  },
  loops: {
    for_a190ec24: { iterationCount: 10, totalTime: 0, maxTime: 0, minTime: Infinity }
  }
}
```

---

## 🚀 Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ts-instrumentation-tool.git
   cd ts-instrumentation-tool
    ``` 

2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Run the Instrumentation:**
    ```bash
    npm run instrument inputFile.ts outputFile.ts
    ```

4. **Explore Your Instrumented Code:**
Open the outputFile.ts to review and test the new instrumented code.


---

## 📖 Usage

- **`logInstrumentor`**: Automatically adds log statements to capture the flow of the function.
- **`perfInstrumentor`**: Adds performance markers around function calls and loops to measure execution time.

## 🛠️ Built With

## 🛠️ Built With

- [TypeScript](https://www.typescriptlang.org/) - Type-safe language that compiles to JavaScript.
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API) - Used to create and manipulate the AST.
- [AST Explorer](https://astexplorer.net/) - Visualize and explore AST structures interactively.
- [TS AST Viewer](https://ts-ast-viewer.com/) - A tool to explore TypeScript ASTs, helpful for understanding node structures.


## 🤝 Contributing

We welcome contributions! If you’d like to improve or extend this project, please feel free to create an issue or pull request. Let’s make TypeScript instrumentation easier and more effective together.


## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

Happy Coding! 🚀
