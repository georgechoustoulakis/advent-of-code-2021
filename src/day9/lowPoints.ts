import {readFileSync} from "fs";
import path from "path";

interface Coordinate {
    x: number,
    y: number,
    value: number
}

export function findLowPoints() {
    const lines = readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8').split('\r\n');

    const grid: number[][] = lines.map((line: string) => line.split('').map((char: string) => Number(char)));
    const gridInCoordinates: Coordinate[][] = grid.map((list, xIndex) => list.map((value, yIndex) => {
        return {x: xIndex, y: yIndex, value}
    }));

    let totalRisk = 0;
    const basinSizes = [];
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            const value = grid[x][y];
            if (((x - 1 < 0) || (grid[x - 1][y] > value))
                && ((x + 1 > grid.length - 1) || (grid[x + 1][y] > value))
                && ((y - 1 < 0) || (grid[x][y - 1] > value))
                && ((y + 1 > grid[x].length - 1) || (grid[x][y + 1] > value))) {
                // console.log('found low point ', value);
                totalRisk += value + 1;

                // Part 2
                const lowestPoint = gridInCoordinates[x][y];
                const pointsBelongingToBasin: Coordinate[] = [lowestPoint];
                const valuesToProcess: Coordinate[] = [lowestPoint]
                while (valuesToProcess.length !== 0) {
                    const biggerValues = findValuesBiggerThanGridPoint(valuesToProcess[0], gridInCoordinates);
                    for (const biggerValue of biggerValues) {
                        if (biggerValue.value === 9 || arrayContainsCoordinate(pointsBelongingToBasin, biggerValue)) {
                            continue;
                        }
                        valuesToProcess.push(biggerValue);
                        pointsBelongingToBasin.push(biggerValue);
                    }
                    valuesToProcess.splice(0, 1);
                }
                basinSizes.push(pointsBelongingToBasin.length);
            }
        }
    }
    console.log('total risk = ', totalRisk);
    basinSizes.sort(((a, b) => b - a));
    console.log(basinSizes.slice(0, 3));
    console.log('multiplied', basinSizes.slice(0, 3).reduce(((previousValue, currentValue) => previousValue * currentValue)));
}

function findValuesBiggerThanGridPoint(point: Coordinate, grid: Coordinate[][]): Coordinate[] {
    const values: Coordinate[] = [];
    if (point.x > 0) {
        values.push(grid[point.x - 1][point.y]);
    }
    if (point.x < grid.length - 1) {
        values.push(grid[point.x + 1][point.y]);
    }
    if (point.y > 0) {
        values.push(grid[point.x][point.y - 1]);
    }
    if (point.y < grid[point.x].length - 1) {
        values.push(grid[point.x][point.y + 1]);
    }
    return values;
}

function arrayContainsCoordinate(array: Coordinate[], point: Coordinate) {
    return array.some((value) => {
        return value.x === point.x
            && value.y === point.y
            && value.value === point.value
    })
}