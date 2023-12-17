const fs = require('fs');

const input = fs.readFileSync("./input.txt", "utf-8");

let answer = 0;

let instruction = 0;

let id = 'AAA';

const instructions = [];

const data = {};

input.split("\r\n").forEach((l, i) => {
    if (i === 0) {
        Array.from(l).forEach(c => instructions.push(c === "L" ? 0 : 1));
    }
    else {
        const m = /^(?<id>[A-Z]+)\s=\s\((?<left>[A-Z]+),\s(?<right>[A-Z]+)\)$/.exec(l);
        if (m?.groups?.id && m?.groups?.left && m?.groups?.right) {
            data[m.groups.id] = [m.groups.left, m.groups.right];
        }
    }
});

while (id !== "ZZZ") {
    id = data[id][instructions[instruction]];
    answer++;
    instruction = (instruction + 1 === instructions.length) ? 0 : instruction + 1;
}

console.log(answer);