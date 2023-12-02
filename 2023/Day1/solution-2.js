const fs = require('fs')

const input = fs.readFileSync("./input.txt", "utf-8")

let answer = 0

const numberMap = ["on", "tw", "th", "fo", "fi", "si", "se", "ei", "ni"]

const getCalibrationValue = (t) => {
    const digits = []
    t.replace(/(\d)|(on(?=e)|tw(?=o)|th(?=ree)|fo(?=ur)|fi(?=ve)|si(?=x)|se(?=ven)|ei(?=ght)|ni(?=ne))/ig, (d) => {
        const number = numberMap.indexOf(String(d).toLocaleLowerCase())
        digits.push(number >= 0 ? number + 1 : d)
        return d
    })
    if (digits.length > 0) {
        const d1 = digits[0]
        const d2 = digits[digits.length - 1]
        return Number(String(d1) + String(d2 || d1))
    }
}
debugger;
input.split("\n").forEach(l => {
    const n = getCalibrationValue(l)
    if (!Number.isNaN(n)) {
        answer += n
    }
})

console.log(answer)