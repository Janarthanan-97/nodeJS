let express = require('express');
let cors = require('cors')
let app = express();
let routerToRooms = require('./routes/indexForRoom.js');
let routerToUser = require('./routes/inderForUsers.js');

app.use(express.json())
app.use(cors());

app.use('/rooms', routerToRooms);
app.use('/users', routerToUser);


app.listen(3001);



