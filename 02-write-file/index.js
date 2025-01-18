const fs = require('fs');
const path = require('path');
const { stdin } = process;

console.log('Hello user!');
console.log('Input your message:');

stdin.on('data', (data) => {
  if (data.toString().includes('exit')) {
    process.exit();
  } else {
    console.log('Input your message:');
    fs.appendFile(`${path.dirname(__filename)}/textFile.txt`, data, (err) => {
      if (err) throw err;
    });
  }
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  console.log('The program is finished. ');
});
