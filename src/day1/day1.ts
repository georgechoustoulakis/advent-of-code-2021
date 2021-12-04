import {readFromFileByLine} from "../utils";
import path from "path";

export function dayOne() {
    const measurements = readFromFileByLine(path.resolve(__dirname, './input.txt'));
    let previous: number | undefined;
    let increments = 0;
    for (const value of measurements) {
        const converted = Number(value);
        if (previous) {
            if (converted > previous) {
                increments++;
            }
        }
        previous = converted;
    }
    console.log(`increments=${increments}`);

    // Part 2
    let slidingPrevious: number | undefined;
    let slidingIncrements = 0;
    for (let i = 0; i < measurements.length - 2; i++) {
        const thingsToAddUp = measurements.slice(i, i + 3);
        const converted = thingsToAddUp.map(value => Number(value)).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        if (slidingPrevious) {
            if (converted > slidingPrevious) {
                slidingIncrements++;
            }
        }
        slidingPrevious = converted;
    }
    console.log(`slidingIncrements=${slidingIncrements}`);
}

