const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);
const stdin = process.stdin;

const makeRequest = function () {
  request(args[0], (err, data, body) => {
    if (!err) {
      fs.writeFile(args[1], body, 'utf-8', (err) => {
        if (err) throw err;
        console.log(data);
        console.log(`Download and saved 1235 bytes to ${args[1]}`);
        process.exit();
      });
    } else {
      console.log(err);
    }
  });
};

fs.access(args[1], (err) => {
  if (!err) {
    console.log(
      "The file already exists. Are you sure you want to overwrite it? If so, please press 'y'.Otherwise, press 'n' to exist"
    );
    stdin.setRawMode(true);
    stdin.setEncoding('utf-8');
    stdin.resume();
    stdin.on('data', (key) => {
      if (key === 'y') {
        makeRequest();
      } else if (key === 'n') {
        process.exit();
      }
    });
  } else {
    makeRequest();
  }
});
