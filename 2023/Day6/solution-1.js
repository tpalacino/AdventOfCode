const fs = require('fs');

const input = fs.readFileSync("./input.txt", "utf-8");

let answer = 0;

const races = []

input.split("\r\n").forEach(l => {
    const m = l.split(/:?\s+/)
    if (m.length > 1) {
        let property = m.shift().toLocaleLowerCase()
        if (property === 'time' || property === 'distance') {
            m.forEach((n, i) => {
                const race = races[i] || {};
                race[property] = Number(n);
                races[i] = race;
            })
        }
    }
});

races.forEach(r => {
    let waysToWin = 0;
    for (let speed = 1; speed < r.time; speed++) {
        const distance = (r.time - speed) * speed;
        if (distance > r.distance) {
            waysToWin++;
        }
    }
    if (waysToWin > 0) {
        answer = answer > 0 ? answer * waysToWin : waysToWin;
    }
})

console.log(answer);