import {readFileSync} from "fs";
import path from "path";


export function sevenSegmentThing() {
    const lines = readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8').split('\r\n');
    let sum = 0;
    for (const entry of lines) {
        const values = entry.split(' ');
        const signalPatterns = values.slice(0, 10);
        const mappedSignals = mapSignalPatternsToDigits(signalPatterns);

        const valuesToDecode = values.slice(11)
        // console.log(...valuesToDecode);
        let output = ''
        for (const valueToDecode of valuesToDecode) {
            for (let i = 0; i < 10; i++) {
                if (valueToDecode.length !== mappedSignals[i].length) {
                    continue;
                }
                let containsAllChars = true;
                for (const char of valueToDecode) {
                    if (!mappedSignals[i].includes(char)) {
                        containsAllChars = false;
                        break;
                    }
                }
                if (containsAllChars) output += i;
            }
        }
        // console.log(output);
        sum += Number(output);
    }
    console.log('sum: ', sum);
}

function mapSignalPatternsToDigits(patterns: string[]): string[] {
    const signals: string[] = new Array(10).fill('');
    // First the fixed length ones
    for (const pattern of patterns) {
        if (pattern.length === 2) {
            signals[1] = pattern;
        } else if (pattern.length === 4) {
            signals[4] = pattern;
        } else if (pattern.length === 3) {
            signals[7] = pattern;
        } else if (pattern.length === 7) {
            signals[8] = pattern;
        }
    }
    let fives = patterns.filter((pattern) => pattern.length === 5);
    let sixes = patterns.filter((pattern) => pattern.length === 6);

    signals[3] = findAndRemoveSignalFromListThatOverlapsWithPattern(fives, signals[1]);

    signals[9] = findAndRemoveSignalFromListThatOverlapsWithPattern(sixes, signals[3]);
    signals[0] = findAndRemoveSignalFromListThatOverlapsWithPattern(sixes, signals[1]);
    signals[6] = sixes[0]; // only one should be remaining

    signals[5] = findAndRemoveSignalFromListThatOverlapsWithPattern(fives, signals[6]);
    signals[2] = fives[0];

    return signals;
}

function findAndRemoveSignalFromListThatOverlapsWithPattern(list: string[], pattern: string): string {
    const match = list.filter((item: string) => {
        let patternFitsInItem = true;
        for (const char of pattern) {
            if (!item.includes(char)) {
                patternFitsInItem = false;
                break;
            }
        }
        if (patternFitsInItem) return true;
        let itemFitsInPattern = true;
        for (const char of item) {
            if (!pattern.includes(char)) {
                itemFitsInPattern = false;
                break;
            }
        }
        return itemFitsInPattern;
    })[0];
    list.splice(list.indexOf(match), 1);
    return match;
}
