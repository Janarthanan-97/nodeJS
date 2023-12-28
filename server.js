const express = require('express');
const userRouter = require('./routes/userRoute')
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())



app.use('/', userRouter)



app.listen(3001)