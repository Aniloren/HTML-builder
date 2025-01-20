const fs = require("fs");
const path = require('path');

const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readableStream.on("data", (data) => console.log(data));

readableStream.on('error', (error) => {
  console.error("Error reading file:", error);
});