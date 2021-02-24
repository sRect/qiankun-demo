const path = require('path');
const fs = require('fs');
// const liveServer = require("live-server");

// const params = {
//   port: 5000, // Set the server port. Defaults to 8080.
//   host: "localhost", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
//   root: "./", // Set root directory that's being served. Defaults to cwd.
//   open: true, // When false, it won't load your browser by default.
//   // ignore: "server.js,./file/", // comma-separated string for paths to ignore
//   file: path.resolve(__dirname, './index.html'), // When set, serve this file for every 404 (useful for single-page applications)
//   wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
//   // mount: [['/components', './node_modules']], // Mount a directory to a route.
//   logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
//   middleware: [
//     function (req, res, next) {
//       next();
//     },
//   ], // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
// };
// liveServer.start(params);

const http = require('http')

http.createServer(function (request, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.writeHead(200, {'Content-Type': 'text/html'});

  fs.readFile(path.resolve(__dirname, './index.html'), function (err, data) {
    res.end(data);
  });
}).listen(5000, () => {
  console.log("Server running at http://127.0.0.1:5000/");
})
