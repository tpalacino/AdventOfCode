const fs = require('fs');

const input = fs.readFileSync("./input.txt", "utf-8");

let answer = 0;

let cards = {};

const ensureCard = (id) => {
    return cards[id] || { id: id, numCorrect: 0, count: 1 };
}

input.split("\r\n").forEach((l, i) => {
    const card = ensureCard(i)
    const sets = l.split(": ")?.[1]?.split(" | ");
    if (sets.length === 2) {
        let correctCount = 0;
        sets[1].trim().split(/\s+/).forEach(n => {
            sets[0].trim().split(/\s+/).forEach(wn => {
                if (n === wn) {
                    correctCount++;
                }
            });
        });
        card.numCorrect = correctCount
        for (let j = i + 1; j <= i + correctCount; j++) {
            const futureCard = ensureCard(j);
            futureCard.count += card.count;
            cards[j] = futureCard;
        }
    }
    cards[i] = card;
})

Object.values(cards).forEach(card => {
    answer += card.count;
})

console.log(answer);