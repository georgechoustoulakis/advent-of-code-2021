import {readFileSync} from "fs";
import path from "path";

interface Coordinate {
    x: number,
    y: number
}

interface Line {
    start: Coordinate,
    end: Coordinate
}

export function drawLines() {
    const lines = readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8').split('\r\n');

    const parsedLines = parseLines(lines)

    const gridSize = 1000;
    const grid: Array<Array<number>> = Array(gridSize).fill(0).map(_ => Array(gridSize).fill(0));
    drawLinesOnGrid(grid, parsedLines);

    const count = howManyBiggerThanOne(grid);
    console.log('bigger than one', count);

}

function parseLines(lines: string[]): Line[] {
    const parsedLines: Line[] = []
    const regex = /(\d+),(\d+) -> (\d+),(\d+)/;
    for (const line of lines) {
        const match = line.match(regex)!;
        parsedLines.push({
            start: {x: Number(match[1]), y: Number(match[2])},
            end: {x: Number(match[3]), y: Number(match[4])}
        });
    }
    return parsedLines;
}

function drawLinesOnGrid(grid: Array<Array<number>>, lines: Line[]): void {
    // Only consider lines where x1 === x2 or y1 === y2
    for (const line of lines) {
        if (line.start.x === line.end.x) {
            const countUp = line.start.y < line.end.y;
            for (let i = line.start.y; countUp ? i < line.end.y + 1 : i > line.end.y - 1; countUp ? i++ : i--) {
                grid[line.start.x][i] += 1;
            }
        } else if (line.start.y === line.end.y) {
            const countUp = line.start.x < line.end.x;
            for (let i = line.start.x; countUp ? i < line.end.x + 1 : i > line.end.x - 1; countUp ? i++ : i--) {
                grid[i][line.start.y] += 1;
            }
        } else {
            const countUpX = line.start.x < line.end.x;
            const countUpY = line.start.y < line.end.y;
            const length = Math.abs(line.start.x - line.end.x);
            const currentPosition: Coordinate = {x: line.start.x, y: line.start.y};
            for (let i = 0; i < length + 1; i++) {
                grid[currentPosition.x][currentPosition.y] += 1;
                countUpX ? currentPosition.x++ : currentPosition.x--;
                countUpY ? currentPosition.y++ : currentPosition.y--;
            }
        }
    }
}

function howManyBiggerThanOne(grid: Array<Array<number>>): number {
    const gridSize = grid.length;
    let count = 0;
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            if (grid[x][y] > 1) {
                count++;
            }
        }
    }
    return count;
}
