const fs = require('fs');

const input = fs.readFileSync("./input.txt", "utf-8");

let answer = 0;

const cardRanks = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

const ensureBestHandEntries = (cards) => {
    const hand = {};
    let numWilds = 0;
    for (const card of cards) {
        if (card === "J") {
            numWilds++;
        }
        else {
            hand[card] = (hand[card] || 0) + 1;
        }
    }
    const entries = Object.entries(hand);
    if (numWilds > 0) {
        switch (entries.length) {
            case 4: {
                entries[0][1] += numWilds
                break;
            }
            case 3: {
                if (entries[0][1] === 2) {
                    entries[0][1] += numWilds
                }
                else if (entries[1][1] === 2) {
                    entries[1][1] += numWilds
                }
                else if (entries[2][1] === 2) {
                    entries[2][1] += numWilds
                }
                else {
                    entries[0][1] += numWilds
                }
                break;
            }
            case 2: {
                if (entries[0][1] === 3) {
                    entries[0][1] += numWilds
                }
                else if (entries[1][1] === 3) {
                    entries[1][1] += numWilds
                }
                else if (entries[0][1] === 2) {
                    entries[0][1] += numWilds
                }
                else if (entries[1][1] === 2) {
                    entries[1][1] += numWilds
                }
                else {
                    entries[0][1] += numWilds
                }
                break;
            }
            case 1: {
                entries[0][1] += numWilds;
                break;
            }
            case 0: {
                entries.push(["J", numWilds])
                break;
            }
        }
    }
    return entries;
}

const getHandRank = (cards) => {
    const entries = ensureBestHandEntries(cards);
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