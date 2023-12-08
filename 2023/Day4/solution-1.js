const fs = require('fs')

const input = fs.readFileSync("./input.txt", "utf-8")

let answer = 0

input.split("\r\n").forEach(l => {
    const sets = l.split(": ")?.[1]?.split(" | ")
    if (sets.length === 2) {
        const winningNumbers = sets[0].trim().split(/\s+/);
        let points = 0;
        sets[1].trim().split(/\s+/).forEach(n => {
            if (winningNumbers.includes(n)) {
                points = points + Math.max(points, 1)
            }
        })
        answer += points
    }
})

console.log(answer)