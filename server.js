let express = require('express');
let cors = require('cors')
let app = express();
let RouterToIndex = require('./routes/index.js')

app.use(express.json())
app.use(cors());

app.use('/', RouterToIndex);

app.listen(3001);



