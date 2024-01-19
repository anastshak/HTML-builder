const path = require('path');
const fs = require('fs');

const pathToFile = path.join(__dirname, 'text.txt');
const streamRead = fs.createReadStream(pathToFile, 'utf-8');

streamRead.on('data', (data) => process.stdout.write(data));
