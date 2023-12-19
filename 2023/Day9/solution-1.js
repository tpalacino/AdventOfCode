const fs = require('fs');

const input = fs.readFileSync("./input.txt", "utf-8");

let answer = 0;

input.split("\r\n").forEach(l => {
    const sequences = [l.split(/\s+/g).map(x => Number(x))];
    while (true) {
        let done = true;
        const prevSequence = sequences[0];
        const nextSequence = new Array(prevSequence.length - 1);
        for (let i = 0; i < nextSequence.length; i++) {
            nextSequence[i] = prevSequence[i + 1] - prevSequence[i]
            if (nextSequence[i] !== 0) {
                done = false;
            }
        }
        sequences.unshift(nextSequence);
        if (done) { break; }
    }
    let nextValue = 0;
    for (let j = 0; j < sequences.length; j++) {
        nextValue += sequences[j].slice(-1)[0];
    }
    answer += nextValue
});

console.log(answer);