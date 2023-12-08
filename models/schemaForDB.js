let mongoose = require('./databaseconnect.js');

const roomSchema = new mongoose.Schema({
    "name": { type: String, required: [true, "Room name is required"]},
    "type": { type: String, required: [true, "Please specify dulux or non dulex"]},
    "Rent": { type: Number, required: [true, "Rent name is required"]},
    "BookingHistory":[],
    "furnished": { type: String, required: [true, "Please specify furnished or non furnished"]}
},
{
    collection: "Hall-booking-API",
    versionKey: false
})

const roomBookingAPIModel = mongoose.model('Hall-booking-API', roomSchema)

module.exports = roomBookingAPIModel;

