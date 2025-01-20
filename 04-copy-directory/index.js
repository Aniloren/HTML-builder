const fs = require('fs');
const path = require('path');

const folderPathForCopying = path.join(__dirname, 'files');
const folderPathCopied = path.join(__dirname, 'files-copy');

function copyDirectory(sourcePath, resultPath) {
  fs.rm(folderPathCopied, { recursive: true, force: true }, () => {
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
  });
}
copyDirectory(folderPathForCopying, folderPathCopied);

