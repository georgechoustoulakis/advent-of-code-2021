import { readFileSync } from "fs";

export function readFromFileByLine(fileName: string): string[] {
    return readFileSync(fileName, 'utf-8').split('\n');
}
