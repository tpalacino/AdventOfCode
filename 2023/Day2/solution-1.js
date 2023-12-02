const fs = require('fs')

const input = fs.readFileSync("./input.txt", "utf-8")

let answer = 0

const maxValues = {
    red: 12,
    green: 13,
    blue: 14
}

input.split("\n").forEach(l => {
    const gameMatch = /^.+?(?<id>\d{1,3}):\s(?<data>.*)/g.exec(l)
    const id = Number(gameMatch?.groups?.id)
    if (!Number.isNaN(id) && gameMatch?.groups?.data) {
        const allRoundsPossible = gameMatch.groups.data.split(";").every(round => {
            return round.trim().split(",").every(countAndColor => {
                const roundMatch = /^(?<count>\d+)\s(?<color>red|green|blue)/.exec(countAndColor.trim())
                const count = Number(roundMatch?.groups?.count)
                const maxCount = roundMatch?.groups?.color && roundMatch?.groups?.color in maxValues ? maxValues[roundMatch.groups.color] : 0
                return count <= maxCount
            })
        })
        if (allRoundsPossible) {
            answer += id
        }
    }
})

console.log(answer)