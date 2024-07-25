const express = require("express");
const connectDB = require('./Config/db')
const cors = require('cors')
const env = require('dotenv')

env.config()



const userRouters = require('./routes/userRoutes')
const propertyRouters = require('./routes/propertyRoutes')


const app = express();
app.use(cors())

connectDB();

app.use(express.json());

app.use("/users", userRouters);
app.use("/property", propertyRouters)


const server = app.listen(
  3000,
  console.log(`Server running on PORT 3000...`)
);