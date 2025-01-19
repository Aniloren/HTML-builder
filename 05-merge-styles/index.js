const fs = require('fs');
const path = require('path');

//Check and delete if file "bundle.css" exists
fs.stat(path.join(__dirname, 'project-dist', 'bundle.css'), (err) => {
  if (!err) {
    fs.truncate(path.join(__dirname, 'project-dist', 'bundle.css'), err => {
      if (err) throw err;
    });
  }
});

//Merge into a file "bundle.css"
fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (file.isFile() && path.extname(file.name) === ".css") {
      const readableStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
      readableStream.on("data", (data) => {
        fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data + '\n', (err) => {
              if (err) throw err;
            });
      });
    }
  });
});