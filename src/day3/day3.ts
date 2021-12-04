import path from "path";
import {readFileSync} from "fs";

export function dayThree() {
    const lines = readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8').split('\r\n');
    const bitLength = lines[1].length;
    const sumOfOnesList = new Array(lines[1].length).fill(0);
    for (const line of lines) {
        for (let i = 0; i < bitLength; i++) {
            if (line[i] === "1") sumOfOnesList[i]++;
        }
    }
    let gamma = 0; // most common bits belong to me
    let epsilon = 0;
    for (let i = 0; i < bitLength; i++) {
        if (sumOfOnesList[bitLength - 1 - i] > lines.length / 2) {
            // The most common (gamma) is "1", so epsilon is "0"
            gamma += 2 ** i;
        } else {
            // The most common (gamma) is "0", so epsilon is "1"
            epsilon += 2 ** i;
        }
    }
    console.log(`power=${gamma * epsilon}`);

    // Part 2
    let remainingOxygen = lines.slice()
    let remainingCarbonDioxide = lines.slice()
    for (let i = 0; i < bitLength; i++) {
        const oxygenSorted: Array<string[]> = [[], []];
        const carbonDioxideSorted: Array<string[]> = [[], []];
        if (remainingOxygen.length > 1) {
            for (const value of remainingOxygen) {
                oxygenSorted[Number(value[i])].push(value);
            }
            remainingOxygen = oxygenSorted[0].length > oxygenSorted[1].length ? oxygenSorted[0] : oxygenSorted[1];
        }
        if (remainingCarbonDioxide.length > 1) {
            for (const value of remainingCarbonDioxide) {
                carbonDioxideSorted[Number(value[i])].push(value);
            }
            remainingCarbonDioxide = carbonDioxideSorted[0].length > carbonDioxideSorted[1].length ? carbonDioxideSorted[1] : carbonDioxideSorted[0];
        }
    }
    console.log(remainingOxygen[0], remainingCarbonDioxide[0], 'oxigen*co2=', parseInt(remainingOxygen[0], 2) * parseInt(remainingCarbonDioxide[0], 2));
}
