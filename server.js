const express = require("express");
const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3021;
}
const server = app.listen(port);

app.use(express.static("public"));

console.log("It works");

// socket part

let socket = require("socket.io");

let io = socket(server); // socket is a function that we apply to the server

io.on("connection", newConnection);

function newConnection(socket) {
  console.log(socket.id);
  socket.on("imagemessage", imageReceived);
}

function imageReceived(data) {
  console.log("Image received");
  io.sockets.emit("imagemessage", data); //send client image back to all
}
