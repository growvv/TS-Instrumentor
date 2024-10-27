/**
 * Utility to generate unique IDs for anonymous functions.
 */
export class IDGenerator {
    private func_counter = 0;
    private call_counter = 0;

    generateFunctionId(): string {
        return `__func_${++this.func_counter}`;
    }

    generateCallId(): string {
        return `__call_${++this.call_counter}`;
    }
}