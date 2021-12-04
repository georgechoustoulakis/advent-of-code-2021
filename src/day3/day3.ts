import { readFromFileByLine } from "../utils";
import path from "path";

export function dayThree() {
    const lines = readFromFileByLine(path.resolve(__dirname, './input.txt'));
    const bitLength = lines[1].length;
    const sumOfOnesList = new Array(lines[1].length).fill(0);
    for (const line of lines){
        for (let i = 0; i < bitLength; i++) {
            if (line[i] === "1") sumOfOnesList[i]++;
        }
    }
    let gamma = 0; // most common bits belong to me
    let epsilon = 0;
    for (let i = 0; i < bitLength ; i++) {
        if (sumOfOnesList[bitLength - 1 - i] > lines.length / 2){
            // The most common (gamma) is "1", so epsilon is "0"
            gamma += 2 ** i;
        } else {
            // The most common (gamma) is "0", so epsilon is "1"
            epsilon += 2 ** i;
        }
    }
    console.log(`power=${gamma*epsilon}`);

    // Part 2
    let remainingOxygen = lines.slice()
    let remainingCo2 = lines.slice()
    let foundOxygen: string | undefined;
    let foundCo2: string | undefined;
    for (let i = 0; i < bitLength; i++) {
        let sumOfOxygenOnes = 0;
        let sumOfCarbonDioxideOnes = 0;
        for (const value of remainingOxygen){
            if (value[i] === "1") sumOfOxygenOnes++;
        }
        for (const value of remainingCo2){
            if (value[i] === "1") sumOfCarbonDioxideOnes++;
        }
        const mostCommonValue = sumOfOxygenOnes > remainingOxygen.length / 2 ? "1" : "0"
        const leastCommonValue = sumOfCarbonDioxideOnes > remainingOxygen.length / 2 ? "0" : "1"
        remainingOxygen = remainingOxygen.filter(value => value[i] === mostCommonValue);
        remainingCo2 = remainingCo2.filter(value => value[i] === leastCommonValue);
        if (remainingOxygen.length === 1){
            foundOxygen = remainingOxygen[0];
        }
        if (remainingCo2.length === 1){
            foundCo2 = remainingCo2[0];
        }
    }
    console.log(foundOxygen, foundCo2,'oxigen*co2=', parseInt(foundOxygen!,2) * parseInt(foundCo2!, 2));
}
