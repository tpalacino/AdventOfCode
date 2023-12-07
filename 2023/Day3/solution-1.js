const fs = require('fs')

const input = fs.readFileSync("input.txt", "utf-8")

let answer = 0

const charPattern = /[^\d\.]/

const isSpecialCharacter = (v) => {
    return v && charPattern.test(v)
}

input.split("\r\n").forEach((l, i, lines) => {
    l.replace(/\d+/g, (m, offset) => {
        const start = offset - 1;
        const end = start + m.length + 1;
        let isPartNumber = isSpecialCharacter(l[start]) || isSpecialCharacter(l[end]);
        if (!isPartNumber) {
            const otherLines = []
            if (lines[i - 1]) { otherLines.push(lines[i - 1]) }
            if (lines[i + 1]) { otherLines.push(lines[i + 1]) }
            isPartNumber = otherLines.some(line => {
                for (let j = start; j <= end; j++) {
                    if (isSpecialCharacter(line?.[j])) {
                        return true
                    }
                }
                return false
            });
        }
        if (isPartNumber) {
            answer += Number(m)
        }
        return m
    })
})

console.log(answer)