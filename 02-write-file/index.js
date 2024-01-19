const path = require('path');
const fs = require('fs');

const pathToFile = path.join(__dirname, 'text.txt');

const { stdin, stdout } = process;

//create a file
fs.writeFile(pathToFile, '', (err) => {
  if (err) throw err;
});

//get user's text
stdout.write('Enter text, please:\n');

//add text
stdin.on('data', (data) => {
  if (data.toString().trim().toLowerCase() === 'exit') {
    process.exit();
  } else {
    fs.appendFile(pathToFile, data, (err) => {
      if (err) throw err;
    });
    //stdout.write(data);
  }
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Goodbye!'));
