/**
 * Utility to generate unique IDs for anonymous functions.
 */
export class IDGenerator {
    private counter = 0;

    generateFunctionId(): string {
        return `__func_${++this.counter}`;
    }

    generateCallId(): string {
        return `__call_${++this.counter}`;
    }
}