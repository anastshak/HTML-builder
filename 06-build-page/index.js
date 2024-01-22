const path = require('path');
const fs = require('fs');
const { error } = require('console');
const fsPromises = require('fs').promises;

const projectDist = path.join(__dirname, 'project-dist');

const components = path.join(__dirname, 'components');
const templateHTML = path.join(__dirname, 'template.html');
const projectDistHTML = path.join(__dirname, 'project-dist', 'index.html');

const styles = path.join(__dirname, 'styles');
const projectDistStyles = path.join(__dirname, 'project-dist', 'style.css');

const assets = path.join(__dirname, 'assets');
const projectDistAssets = path.join(__dirname, 'project-dist', 'assets');

//create a folder
fs.mkdir(projectDist, { recursive: true }, (err) => {
  if (err) console.log('error');
});
console.log('created "project-dist" folder');

//merge styles
fs.readdir(styles, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error.message);
  }
  const writeStream = fs.createWriteStream(projectDistStyles);
  files.forEach((file) => {
    if (file.isFile()) {
      const pathFile = path.join(styles, file.name);
      const ext = file.name.split('.')[1];
      if (ext === 'css') {
        const readStream = fs.createReadStream(pathFile, 'utf-8');
        readStream.pipe(writeStream);
      }
    }
  });
});
console.log('created and merged "project-dict/style.css"');

//copy dir
async function copyDir(assets, projectDistAssets) {
  try {
    // //delete files
    // await fsPromises.rm(
    //   projectDistAssets,
    //   { force: true, recursive: true },
    //   (err) => {
    //     if (err) console.log('error');
    //   },
    // );

    //create a folder
    await fsPromises.mkdir(projectDistAssets, { recursive: true }, (err) => {
      if (err) console.log('error');
    });

    //copy nested files and folders
    const files = await fsPromises.readdir(
      assets,
      { withFileTypes: true },
      (err, files) => {
        if (err) console.log('error');
        return files;
      },
    );
    files.forEach((file) => {
      const pathFile = path.join(assets, file.name);
      const pathCopyFile = path.join(projectDistAssets, file.name);
      if (file.isFile()) {
        fsPromises.copyFile(pathFile, pathCopyFile);
      } else if (file.isDirectory()) {
        copyDir(pathFile, pathCopyFile);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}
console.log('copied "assets"');
copyDir(assets, projectDistAssets);

//html
fs.readFile(templateHTML, 'utf-8', (err, tempData) => {
  if (err) throw err;

  fs.readdir(components, { withFileTypes: true }, (err, files) => {
    if (err) throw error;

    //select only html files
    const htmlFiles = files.filter(
      (file) => file.name.split('.')[1] === 'html',
    );

    htmlFiles.forEach((file) => {
      fs.readFile(path.join(components, file.name), 'utf-8', (err, data) => {
        if (err) throw err;
        let index = '{{' + file.name.split('.')[0] + '}}';
        tempData = tempData.toString().replaceAll(index, data);

        fs.writeFile(projectDistHTML, tempData, (err) => {
          if (err) throw err;
        });
      });
    });
  });
});
console.log('completed index.html');
