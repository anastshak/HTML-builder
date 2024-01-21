const path = require('path');
const fsPromises = require('fs').promises;

const pathFolder = path.join(__dirname, 'files');
const pathCopyFolder = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    //delete files
    await fsPromises.rm(
      pathCopyFolder,
      { force: true, recursive: true },
      (err) => {
        if (err) console.log('error');
      },
    );
    console.log('deleted');

    //create a folder
    await fsPromises.mkdir(pathCopyFolder, { recursive: true }, (err) => {
      if (err) console.log('error');
    });
    console.log('created');

    //copy files
    const files = await fsPromises.readdir(
      pathFolder,
      { withFileTypes: true },
      (err, files) => {
        if (err) console.log('error');
        return files;
      },
    );
    files.forEach((file) => {
      const pathFile = path.join(pathFolder, file.name);
      const pathCopyFile = path.join(pathCopyFolder, file.name);
      fsPromises.copyFile(pathFile, pathCopyFile);
    });

    console.log('copied');
  } catch (error) {
    console.log('error');
  }
}

copyDir();
