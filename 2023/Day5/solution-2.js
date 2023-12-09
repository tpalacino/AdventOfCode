const fs = require('fs');

const input = fs.readFileSync("./input.txt", "utf-8");

let answer = NaN;
const seeds = [];
const maps = {};

let map = undefined

input.split("\r\n").forEach(l => {
    const mMap = /(?<name>\w+-to-\w+) map:.*/.exec(l);
    if (mMap?.groups?.name) {
        map = [];
        maps[mMap.groups.name] = map;
    }
    else if (l.startsWith("seeds: ")) {
        const seedInfo = l.substring(6).trim().split(/\s+/);
        if (seedInfo.length % 2 === 0) {
            for (let pairIndex = 0; pairIndex < seedInfo.length; pairIndex += 2) {
                const seedStart = Number(seedInfo[pairIndex]);
                const seedLength = Number(seedInfo[pairIndex + 1]);
                seeds.push({
                    start: seedStart,
                    length: seedLength
                });
            }
        }
    }
    else {
        const mEntry = /^(?<left>\d+)\s+(?<right>\d+)\s+(?<length>\d+)$/.exec(l.trim());
        if (mEntry?.groups?.left && mEntry?.groups?.right && mEntry?.groups?.length) {
            map.push({
                source: Number(mEntry.groups.right),
                destination: Number(mEntry.groups.left),
                length: Number(mEntry.groups.length)
            });
        }
    }
});

const calculateDestionation = (mapName, seed) => {
    const mapEntry = maps[mapName].find(x => {
        return seed >= x.source && seed < x.source + x.length;
    });
    if (mapEntry) {
        return mapEntry.destination + (seed - mapEntry.source);
    }
    else {
        return seed;
    }
}

Object.values(maps).forEach(m => {
    m.sort((a, b) => a.source - b.source);
});

seeds.forEach(seed => {
    for (let seedIndex = seed.start; seedIndex < seed.start + seed.length; seedIndex++) {
        const soil = calculateDestionation("seed-to-soil", seedIndex);
        const fertilizer = calculateDestionation("soil-to-fertilizer", soil);
        const water = calculateDestionation("fertilizer-to-water", fertilizer);
        const light = calculateDestionation("water-to-light", water);
        const temperature = calculateDestionation("light-to-temperature", light);
        const humidity = calculateDestionation("temperature-to-humidity", temperature);
        const location = calculateDestionation("humidity-to-location", humidity);
        answer = isNaN(answer) ? location : Math.min(answer, location);
    }
});

console.log(answer);