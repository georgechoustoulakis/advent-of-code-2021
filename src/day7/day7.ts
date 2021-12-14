import {readFileSync} from "fs";
import path from "path";


export function calculateCrabPosition() {
    const lines = readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8').split('\r\n');
    const crabPositions: number[] = lines[0].split(',').map((text) => Number(text));

    const max = Math.max(...crabPositions);
    let fuel = Infinity;
    let position = -1;
    for (let i = 0; i < max; i++) {
        let sum = 0;
        for (const crab of crabPositions){
            const steps = Math.abs(crab - i);
            for (let j = 1; j <= steps; j++) {
                sum += j;
            }
            if (sum > fuel) break;
        }
        if (sum < fuel){
            fuel = sum;
            position = i;
        }
    }
    console.log('position', position, 'fuel', fuel)
}