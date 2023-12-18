let express = require('express');
let cors = require('cors')
let app = express();
let teacherRoute = require('./routes/teacherRoute')
let studentRoute = require('./routes/studentRoute')
app.use(express.json())
app.use(cors());


app.use('/teachers', teacherRoute)
app.use('/students', studentRoute)


app.listen(3001);



