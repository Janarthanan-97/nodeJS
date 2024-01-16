const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

const itemRouter = require('./routes/itemRoutes')
const orderRouter = require('./routes/orderRouter')
const userRouter = require('./routes/userRouter')

app.use('/items', itemRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);
app.get('/', async(req, res)=>{
    res.send("welcome to Inventory app")
})

app.listen(3001)
