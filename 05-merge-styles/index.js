const path = require('path');
const fs = require('fs');

const pathToFolder = path.join(__dirname, 'styles');
const pathToBundle = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(pathToFolder, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error.message);
  }
  const writeStream = fs.createWriteStream(pathToBundle);
  files.forEach((file) => {
    if (file.isFile()) {
      const pathFile = path.join(pathToFolder, file.name);
      const ext = file.name.split('.')[1];
      if (ext === 'css') {
        const readStream = fs.createReadStream(pathFile, 'utf-8');
        readStream.pipe(writeStream);
      }
    }
  });
});
