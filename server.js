const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const { default: axios } = require('axios')

let app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res)=>{
  try {
    let {data} = await axios.get("http://192.168.1.7/blink")
    res.send(data)
  } catch (error) {
    res.send(error)
  }
})



app.listen(3000)