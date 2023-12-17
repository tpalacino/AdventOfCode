const fs = require('fs');

const input = fs.readFileSync("./input.txt", "utf-8");

let answer = 0;

let instruction = 0;

let ids = [];

const instructions = [];

const data = {};

input.split("\r\n").forEach((l, i) => {
    if (i === 0) {
        Array.from(l).forEach(c => instructions.push(c === "L" ? 0 : 1));
    }
    else {
        const m = /^(?<id>[A-Z0-9]+)\s=\s\((?<left>[A-Z0-9]+),\s(?<right>[A-Z0-9]+)\)$/.exec(l);
        if (m?.groups?.id && m?.groups?.left && m?.groups?.right) {
            data[m.groups.id] = [m.groups.left, m.groups.right];
            if (m.groups.id.endsWith("A")) {
                ids.push({
                    value: m.groups.id,
                    answer: 0
                });
            }
        }
    }
});

while (ids.some(id => id.answer === 0)) {
    answer++;
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];

        id.value = data[id.value][instructions[instruction]];
        if (id.answer === 0 && id.value.endsWith("Z")) {
            id.answer = answer;
        }
    }
    instruction = (instruction + 1 === instructions.length) ? 0 : instruction + 1;
}

const gcd = (a, b) => (b ? gcd(b, a % b) : a);

const lcm = (a, b) => ((a * b) / gcd(a, b));

const lcms = (numbers) => {
    let candidate = 1;
    for (var i = 0; i < numbers.length; i++) {
        candidate = lcm(candidate, numbers[i]);
    }
    return candidate;
};

answer = lcms(ids.map(id => id.answer));

console.log(answer);