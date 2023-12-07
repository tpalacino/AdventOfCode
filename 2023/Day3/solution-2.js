const fs = require('fs')

const input = fs.readFileSync("input.txt", "utf-8")

let answer = 0

const charPattern = /\d/

const isDigit = (v) => {
    return v && charPattern.test(v)
}

const getNumbers = (line, point) => {
    const numbers = []
    if (typeof line === "string" && typeof point === 'number') {
        const leftDigits = [], rightDigits = []
        let leftPoint = point - 1;
        let isDigitLeft = isDigit(line[leftPoint])
        while (isDigitLeft) {
            leftDigits.unshift(line[leftPoint]);
            leftPoint--;
            isDigitLeft = leftPoint >= 0 && isDigit(line[leftPoint])
        }

        let rightPoint = point + 1;
        let isDigitRight = isDigit(line[rightPoint])
        while (isDigitRight) {
            rightDigits.push(line[rightPoint]);
            rightPoint++;
            isDigitRight = rightPoint < line.length ? isDigit(line[rightPoint]) : undefined
        }

        if (isDigit(line[point])) {
            let numberString = '';
            if (leftDigits.length > 0) {
                numberString += leftDigits.join("")
            }
            numberString += line[point]
            if (rightDigits.length > 0) {
                numberString += rightDigits.join("")
            }
            const num = Number(numberString)
            if (!isNaN(num)) {
                numbers.push(num)
            }
        }
        else {
            const leftNum = leftDigits.length > 0 ? Number(leftDigits.join("")) : NaN
            if (!isNaN(leftNum)) {
                numbers.push(leftNum)
            }
            const rightNum = rightDigits.length > 0 ? Number(rightDigits.join("")) : NaN
            if (!isNaN(rightNum)) {
                numbers.push(rightNum)
            }
        }
    }
    return numbers
}

input.split("\r\n").forEach((l, i, lines) => {
    l.replace(/\*/g, (m, offset) => {
        const adjacentNumbers = getNumbers(lines[i - 1], offset)
            .concat(getNumbers(lines[i], offset))
            .concat(getNumbers(lines[i + 1], offset));
        if (adjacentNumbers.length === 2) {
            answer += (adjacentNumbers[0] * adjacentNumbers[1])
        }
        return m
    })
})

console.log(answer)