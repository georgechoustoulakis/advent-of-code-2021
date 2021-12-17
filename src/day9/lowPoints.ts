import {readFileSync} from "fs";
import path from "path";


export function findLowPoints() {
    const lines = readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8').split('\r\n');

    const grid: number[][] = lines.map((line: string) => line.split('').map((char: string) => Number(char)));

    let totalRisk = 0;
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            const value = grid[x][y];
            if (((x - 1 < 0) || (grid[x - 1][y] > value))
                && ((x + 1 > grid.length - 1) || (grid[x + 1][y] > value))
                && ((y - 1 < 0) || (grid[x][y - 1] > value))
                && ((y + 1 > grid[x].length - 1) || (grid[x][y + 1] > value))) {
                // console.log('found low point ', value);
                totalRisk += value + 1;
            }
        }
    }
    console.log('total risk = ', totalRisk);
}