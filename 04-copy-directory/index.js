const fs = require('fs');
const path = require('path');

const folderPathForCopying = path.join(__dirname, 'files');
const folderPathCopied = path.join(__dirname, 'files-copy');

//removing folder
fs.rm(folderPathCopied, { recursive: true, force: true }, (err) => {
  if (err) {
    console.error('Error removing directory:', err);
    return;
  };

  //creating folder
  fs.mkdir(folderPathCopied, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating directory:', err);
      return
    }

    //copying files
    fs.readdir(folderPathForCopying, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {

        fs.copyFile(
          path.join(folderPathForCopying, file),
          path.join(folderPathCopied, file),
          (err) => {
            if (err) throw err;
          },
        );
      });
    });
  });
});



