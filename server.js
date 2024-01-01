const express = require('express');
const userRouter = require('./routes/userRoute')
const urlRouter = require('./routes/URLRoute')
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())



app.use('/api/users', userRouter)
app.use('/api/url', urlRouter)



app.listen(3001)