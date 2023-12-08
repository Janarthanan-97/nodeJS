let mongoose = require('mongoose');

try {
    mongoose.connect('mongodb+srv://janamadhav13:Kasthuri20@cluster0.1v6kz5t.mongodb.net/API')
    
} catch (error) {
    console.log(error)
}
module.exports = mongoose;