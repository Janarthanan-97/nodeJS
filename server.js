const express = require("express");
const connectDB = require('./Config/db')
const cors = require('cors')
const env = require('dotenv')

env.config()



const userRouters = require('./routes/userRoutes')
const chatRouters = require('./routes/chatRoutes')
const messageRouter = require('./routes/messageRoutes')

const app = express();
app.use(cors())

connectDB();

app.use(express.json());

app.use("/api/user", userRouters);
app.use('/api/chat', chatRouters)
app.use('/api/message', messageRouter)

const server = app.listen(
  3000,
  console.log(`Server running on PORT 3000...`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FE_URL,
  },
})

io.on("connection", (socket) => {
  console.log("Connected to socket.io")
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
})

