const fs = require('fs')

const input = fs.readFileSync("./input.txt", "utf-8")

let answer = 0

input.split("\n").forEach(l => {
    const gameMatch = /^.+?(?<id>\d{1,3}):\s(?<data>.*)/g.exec(l)
    const id = Number(gameMatch?.groups?.id)
    if (!Number.isNaN(id) && gameMatch?.groups?.data) {
        const counts = { red: 0, green: 0, blue: 0 }
        for (const round of gameMatch.groups.data.split(";")) {
            for (const countAndColor of round.trim().split(",")) {
                const roundMatch = /^(?<count>\d+)\s(?<color>red|green|blue)/.exec(countAndColor.trim())
                const count = Number(roundMatch?.groups?.count)
                if (!Number.isNaN(count) && roundMatch?.groups?.color && roundMatch.groups.color in counts && count > counts[roundMatch.groups.color]) {
                    counts[roundMatch.groups.color] = count
                }
            }
        }
        answer += (counts.red * counts.green * counts.blue)
    }
})

console.log(answer)