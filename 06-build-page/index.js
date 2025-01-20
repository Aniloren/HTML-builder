const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, 'project-dist');
const originalComponentsPath = path.join(__dirname, 'components');
const originalHtmlFilePath = path.join(__dirname, 'template.html');
const resultIndexPath = path.join(__dirname, 'project-dist', 'index.html');
const resultStylePath = path.join(__dirname, 'project-dist', 'style.css');
const originalStylePath = path.join(__dirname, 'styles');
const resultCopiedFilesPath = path.join(__dirname, 'project-dist', 'assets');
const originalCopiedFilesPath = path.join(__dirname, 'assets');

//removing folder
fs.rm(outPath, { recursive: true, force: true }, (err) => {
  if (err) {
    console.error('Error removing directory:', err);
    return;
  }
  //creating folder
  fs.mkdir(outPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating directory:', err);
      return;
    }
    //getting string from original file
    const readableStream = fs.createReadStream(originalHtmlFilePath, 'utf-8');
    readableStream.on('data', (data) => {
      let outputHtmlData = data;

      //reading components files
      fs.readdir(
        originalComponentsPath,
        { withFileTypes: true },
        (err, files) => {
          if (err) {
            console.error('Error creating folder', err);
          }
          for (let i = 0; i < files.length; i++) {
            const readableStream = fs.createReadStream(
              path.join(originalComponentsPath, files[i].name),
              'utf-8',
            );
            readableStream.on('data', (data) => {
              const fileContent = data;

              fileName = files[i].name.split('.html')[0];
              outputHtmlData = outputHtmlData.replace(
                `{{${fileName}}}`,
                fileContent,
              );
              if (i === files.length - 1) {
                //create and save new index file
                fs.appendFile(resultIndexPath, outputHtmlData, (err) => {
                  if (err) {
                    console.error('Error appending file', err);
                  }
                });
              }
            });
          }
        },
      );
    });
    //Merge into a file "style.css"
    fs.readdir(originalStylePath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error('Error reading folder', err);
      }
      files.forEach((file) => {
        if (file.isFile() && path.extname(file.name) === '.css') {
          const readableStream = fs.createReadStream(
            path.join(originalStylePath, file.name),
            'utf-8',
          );
          readableStream.on('data', (data) => {
            fs.appendFile(resultStylePath, data + '\n', (err) => {
              if (err) throw err;
            });
          });
        }
      });
    });
    //copy folder
    function copyDirectory(sourcePath, resultPath) {
      fs.mkdir(resultPath, { recursive: true }, (err) => {
        if (err) {
          console.error('Error creating folder', err);
        }
        fs.readdir(sourcePath, { withFileTypes: true }, (err, files) => {
          if (err) {
            console.error('Error reading the directory', err);
            return;
          } else {
            files.forEach((file) => {
              const sourceFile = path.join(sourcePath, file.name);
              const resultFile = path.join(resultPath, file.name);
              fs.stat(sourceFile, (err, stat) => {
                if (err) {
                  console.error('Error reading stat', err);
                }
                if (stat.isDirectory()) {
                  copyDirectory(sourceFile, resultFile);
                } else {
                  fs.copyFile(sourceFile, resultFile, (err) => {
                    if (err) {
                      console.error('Error copying a file', err);
                    }
                  });
                }
              });
            });
          }
        });
      });
    }
    copyDirectory(originalCopiedFilesPath, resultCopiedFilesPath);
  });
});
