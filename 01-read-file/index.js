const fs = require("fs");
const path = require('path');

//first way
// const readableStream = fs.createReadStream(`${process.argv[1]}/text.txt`, 'utf-8');
// readableStream.on("data", (data) => console.log(data));

//second way
// const readableStream = fs.createReadStream(`${__dirname}/text.txt`, 'utf-8');
// readableStream.on("data", (data) => console.log(data));

//third way
const readableStream = fs.createReadStream(`${path.dirname(__filename)}/text.txt`, 'utf-8');
readableStream.on("data", (data) => console.log(data));

readableStream.on('error', (error) => {
  console.error("Error reading file:", error);
});