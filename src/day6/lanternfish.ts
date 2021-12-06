import {readFileSync} from "fs";
import path from "path";


export function multiplyFish() {
    const lines = readFileSync(path.resolve(__dirname, './example.txt'), 'utf-8').split('\r\n');

    const fish: number[] = lines[0].split(",").map(value => Number(value));
    const days = 80;

    for (let i = 0; i < days; i++) {
        const fishToAdd: number[] = []
        for (let fishId = 0; fishId < fish.length; fishId++) {
            if (fish[fishId] === 0) {
                fish[fishId] = 6;
                fishToAdd.push(8);
            } else {
                fish[fishId]--;
            }
        }
        fish.push(...fishToAdd);
    }
    console.log(fish);
    console.log('number of fish', fish.length)
}
