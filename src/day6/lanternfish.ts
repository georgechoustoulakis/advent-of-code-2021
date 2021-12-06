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
    console.log('number of fish after 80', fish.length)
}

interface Day {
    numberOfFish: number;
}

export function multiplyFishPart2() {
    const lines = readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8').split('\r\n');

    const fish: number[] = lines[0].split(",").map(value => Number(value));
    const days = 256;

    const calendar: Day[] = new Array(9).fill(0).map(value => ({numberOfFish: value}));
    for (const vis of fish) {
        calendar[vis].numberOfFish++;
    }

    for (let i = 0; i < days; i++) {
        let fishGivingBirth = 0;
        for (let day = 0; day < 9; day++) {
            if (day === 0) {
                fishGivingBirth = calendar[day].numberOfFish;
            } else {
                calendar[day - 1].numberOfFish = calendar[day].numberOfFish;
            }
        }
        calendar[6].numberOfFish += fishGivingBirth;
        calendar[8].numberOfFish = fishGivingBirth;
    }

    let total = 0
    for (const day of calendar){
        total += day.numberOfFish;
    }
    console.log('number of fish after 256', total);
}