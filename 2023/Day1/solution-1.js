const fs = require('fs')

const input = fs.readFileSync("./input.txt", "utf-8")

let answer = 0

const getCalibrationValue = (t) => {
    const digits = []
    t.replace(/\d/g, (d) => (digits.push(d), ''))
    if (digits.length > 0) {
        const d1 = digits[0]
        const d2 = digits[digits.length - 1]
        return Number(String(d1) + String(d2 || d1))
    }
}

input.split("\n").forEach(l => {
    const n = getCalibrationValue(l)
    if (!Number.isNaN(n)) {
        answer += n
    }
})

console.log(answer)