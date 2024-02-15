const fs = require('fs');
const request = require('request');
const net = require('net');

const conn = net.createConnection({ 
  host: 'example.edu',
  port: 80
});
conn.setEncoding('UTF8');

const url = process.argv[2];
const path = process.argv[3];

// Download resource at URL to local path. 
// Prints out message when downloaded with file size. 
const fetchData = function(resourceUrl, savePath) {
  let fileSize = 0;
  request(resourceUrl, (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    fs.writeFile(savePath, body, err => {
      if (err) {
        console.log(err);
      } else {
        fs.stat(savePath, (err, stats) => {
          if (err) {
            console.error(err);
            return;
          }
          fileSize = stats.size;
          console.log(`Downloaded and saved ${fileSize} bytes to ${savePath}`)
          process.exit()
        })
      }
    })
  })
}
  


fetchData(url, path);