const express = require("express");
const socket = require("socket.io");

const PORT = 3000;

const app = express();
const server = require("http").createServer(app);

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  const sendMessage = (message) => {
    socket.broadcast.emit("message", {
      username: socket.username,
      message: `${socket.username}: ${message}`,
      show_avatar: true,
    });
  };

  const emitFromServer = (type, message) => {
    io.sockets.emit(type, message);
  };

  // Return to React-Native

  // emit the username when the user connects
  socket.on("username", (username) => {
    socket.username = username;
    console.log(`${username} connected`);
    emitFromServer("user_state_change", {
      username: username,
      message: `${username} connected`,
      show_avatar: false,
    });
  });

  // emit the message when the user sends a message
  socket.on("message", (data) => {
    if (!socket.username) {
      return;
    }

    console.log(`${socket.username} sent a message: ${data}`);
    sendMessage(data);
  });

  // emit the message when the user disconnects
  socket.on("disconnect", () => {
    if (!socket.username) {
      return;
    }

    console.log(`${socket.username} disconnected`);
    emitFromServer("user_state_change", {
      username: socket.username,
      message: `${socket.username} disconnected`,
      show_avatar: false,
    });
    socket.username = null;
  });

  socket.on("user_disconnect", () => {
    if (!socket.username) {
      return;
    }

    console.log(`${socket.username} disconnected`);
    emitFromServer("user_state_change", {
      username: socket.username,
      message: `${socket.username} disconnected`,
      show_avatar: false,
    });
    socket.username = null;
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
