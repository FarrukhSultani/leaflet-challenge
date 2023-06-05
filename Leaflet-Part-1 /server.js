const http = require("http");
const ecstatic = require("ecstatic");

const server = http.createServer(
  ecstatic({
    root: __dirname,
  })
);

server.listen(8000); // Change the port number here

console.log("Server listening on http://localhost:8000");
