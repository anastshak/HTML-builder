const path = require('path');
const fs = require('fs');
// const { stdin, stdout } = process;

const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error.message);
  }
  files.forEach((file) => {
    if (file.isFile()) {
      const name = file.name.split('.')[0];
      const ext = file.name.split('.')[1];
      const pathToFile = path.join(__dirname, 'secret-folder', file.name);

      fs.stat(pathToFile, (error, stats) => {
        if (error) {
          console.log(error.message);
        }
        console.log(`${name} - ${ext} - ${stats.size}b`);
      });
    }
  });
});
