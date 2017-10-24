import fs from 'fs';
const settings = JSON.parse(fs.readFileSync('./package.json'));

console.info(settings);