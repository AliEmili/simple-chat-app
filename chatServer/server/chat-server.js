const WebSocket = require("ws");
let models = require("./server.js").models;

const ws = new WebSocket.Server({ port: 8080 });

ws.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("got message", JSON.parse(message));
  });

  console.log("Got message", ws);
});
