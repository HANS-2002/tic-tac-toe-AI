const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

io.listen(
  app.listen(4000, () => {
    console.log("Server listening on port 4000");
  })
);
io.on("connection", (client) => {
  console.log(`Client ${client.id} connected`);
  // get unique client id
    // console.log(client.id);
  client.on("join", (data) => {
    console.log(data);
  });
  client.on("disconnect", () => {
    console.log(`Client ${client.id} disconnected`);
  });
});
