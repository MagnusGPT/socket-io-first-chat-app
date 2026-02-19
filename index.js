const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const portNo = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`Someone connected with the socket ID ${socket.id}`);
  socket.on("messageComing", (msgPack) => {
    io.emit("messageComing", `"${msgPack.username}:" ${msgPack.message}`)
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });
});

server.listen(portNo, () => {
  console.log(`listening on http://localhost:${portNo}`);
});