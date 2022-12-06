/*Los sockets establecen comunicación bidireccional*/
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/templates/index.html");
});

io.on("connection", (socket) => {
    console.log("Usuario conectado al chat");
    socket.on("chat message", (msg) => {
        //Se crea socket para enviar mensaje
        io.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });
});

server.listen(8080, () => {
    console.log("activo en  8080");
});
