import {readFileSync} from "fs";
import path from "path";

interface BingoBoard {
    grid: Array<MarkedNumber[]>
    marks: number;
}

interface MarkedNumber {
    value: number,
    marked: boolean
}

export function playBingo() {
    const lines = readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8').split('\r\n');
    const bingoInput = lines[0].split(",").map(text => Number(text));
    const bingoBoards = parseBoards(lines.slice(1));

    for (const draw of bingoInput) {
        for (const board of bingoBoards) {
            if (applyBingoMarkAndCheckVictory(draw, board)) {
                return console.log("winner", board, 'score', sumOfUnmarkedNumbers(board) * draw);
            }
        }
    }

    console.log("no winners");
}

function parseBoards(lines: string[]): BingoBoard[] {
    const boards: BingoBoard[] = [];
    for (let i = 0; i < lines.length; i += 6) {
        const board: BingoBoard = {grid: [], marks: 0};
        for (let j = 0; j < 5; j++) {
            const line = lines[i + j + 1];
            const split = line.replace(/\s\s+/g, " ").trim().split(" ");
            const numbers = split.map(text => ({value: Number(text), marked: false}));
            board.grid.push(numbers);
        }
        boards.push(board);
    }
    return boards;
}

function applyBingoMarkAndCheckVictory(draw: number, board: BingoBoard): boolean {
    for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 5; column++) {
            const position = board.grid[row][column];
            if (position.value === draw) {
                position.marked = true;
                board.marks++;
                if (board.marks > 4) {
                    return checkVictory(row, column, board);
                }
                return false;
            }
        }
    }
    return false;
}

function checkVictory(row: number, column: number, board: BingoBoard): boolean {
    return checkRows(row, board) || checkColumns(column, board);
}

function checkRows(row: number, board: BingoBoard): boolean {
    for (let i = 0; i < 5; i++) {
        if (!board.grid[row][i].marked) {
            return false;
        }
    }
    return true
}

function checkColumns(column: number, board: BingoBoard): boolean {
    for (let i = 0; i < 5; i++) {
        if (!board.grid[i][column].marked) {
            return false;
        }
    }
    return true
}

function sumOfUnmarkedNumbers(board: BingoBoard): number {
    let sum = 0;
    for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 5; column++) {
            if (!board.grid[row][column].marked) {
                sum += board.grid[row][column].value;
            }
        }
    }
    return sum;

}