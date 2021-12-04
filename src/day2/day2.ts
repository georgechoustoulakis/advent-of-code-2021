import {readFromFileByLine} from "../utils";
import path from "path";

export function dayTwo() {
    const lines = readFromFileByLine(path.resolve(__dirname, './input.txt'));
    let horizontal = 0;
    let depth = 0;
    for (const line of lines) {
        const split = line.split(' ');
        const value = Number(split[1]);
        switch (split[0]) {
            case "forward":
                horizontal += value;
                break;
            case "down":
                depth += value;
                break;
            case "up":
                depth -= value;
                break;
        }
    }
    console.log(`x=${horizontal} d=${depth} multiplied=${horizontal * depth}`)
    // Part2
    let horizontal2 = 0;
    let depth2 = 0;
    let aim = 0;
    for (const line of lines) {
        const split = line.split(' ');
        const value = Number(split[1]);
        switch (split[0]) {
            case "forward":
                horizontal2 += value;
                depth2 += aim * value;
                break;
            case "down":
                aim += value;
                break;
            case "up":
                aim -= value;
                break;
        }
    }
    console.log(`x=${horizontal2} d=${depth2} multiplied=${horizontal2 * depth2}`)
}