const fs = require('fs');

const input = fs.readFileSync("./input.txt", "utf-8");

let answer = 0;

const cardRanks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const getHandRank = (cards) => {
    const hand = {};
    for (const card of cards) {
        hand[card] = (hand[card] || 0) + 1;
    }
    const entries = Object.entries(hand);
    switch (entries.length) {
        case 5: { return 1; }
        case 4: { return 2; }
        case 3: {
            return entries.some(e => e[1] === 3) ? 4 : 3;
        }
        case 2: {
            return entries.some(e => e[1] === 4) ? 6 : 5;
        }
        case 1: { return 7; }
    }
    return 0;
};

const hands = []

input.split("\r\n").forEach(l => {
    const parts = l.split(/\s/);
    if (parts.length === 2) {
        hands.push({
            cards: parts[0],
            bid: Number(parts[1]),
            rank: getHandRank(parts[0])
        })
    }
});

hands.sort((a, b) => {
    if (b.rank === a.rank) {
        for (let i = 0; i < a.cards.length; i++) {
            const aCardRank = cardRanks.indexOf(a.cards[i]);
            const bCardRank = cardRanks.indexOf(b.cards[i]);
            if (aCardRank !== bCardRank) {
                return aCardRank - bCardRank;
            }
        }
    }
    return a.rank - b.rank;
});

hands.forEach((h, i) => {
    answer += (h.bid * (i + 1));
})

console.log(answer);