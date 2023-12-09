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
        l.substring(6).trim().split(/\s+/).forEach(s => {
            seeds.push(Number(s));
        });
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
        return seed >= x.source && seed <= x.source + x.length;
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
    const soil = calculateDestionation("seed-to-soil", seed);
    const fertilizer = calculateDestionation("soil-to-fertilizer", soil);
    const water = calculateDestionation("fertilizer-to-water", fertilizer);
    const light = calculateDestionation("water-to-light", water);
    const temperature = calculateDestionation("light-to-temperature", light);
    const humidity = calculateDestionation("temperature-to-humidity", temperature);
    const location = calculateDestionation("humidity-to-location", humidity);
    answer = isNaN(answer) ? location : Math.min(answer, location);
});

console.log(answer);