const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (file.isFile()) {
      fs.stat(path.join(folderPath, file.name), (err, stats) => {
        if (err) throw err;
        console.log(
          `${file.name.split(path.extname(file.name))[0]} - ${path
            .extname(file.name)
            .slice(1)} - ${stats.size / 1024} kb`,
        );
      });
    }
  });
});