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

io.on("connection", (socket)=>{
  console.log("Connected to socket.io")
})

