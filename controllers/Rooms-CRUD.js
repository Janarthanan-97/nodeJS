let roomBookingAPIModel = require('../models/schemaForDB.js')
let isDateAvailable = require('../operations/bookingDateAvailableChec.js')

const getAllRoomsFromModel = async (req, res) => {
    try {
        let rooms = await roomBookingAPIModel.find()
        res.status(200).send(rooms)

    } catch (error) {
        res.send(error);
    }
}

let createRoom = async (req, res) => {
    try {
        await roomBookingAPIModel.create(req.body);
        res.status(200).send("Room created succesfully");
    } catch (error) {
        res.send(error);
    }
}

let bookRoom = async (req, res) => {
    let { id } = req.params;
    let selectedRoom = await roomBookingAPIModel.findById(id);
    if (req.body.userID && req.body.startDate && req.body.endDate) {
        let newBookingObject = req.body;
        let bookingHistoryArray = selectedRoom.BookingHistory;
        if(isDateAvailable(bookingHistoryArray, newBookingObject)){
            selectedRoom.BookingHistory.push(req.body);
            selectedRoom.save();
            res.status(200).send("Room booked succesfully");
        }
        else{
            res.send({message: "Room is already booked"});
        }
    }
    else {
        res.status(200).send("Please give userID, startDate, endDate")
    }



}

let deleteRoom = async (req, res) => {
    let { id } = req.params;
    await roomBookingAPIModel.deleteOne({ _id: id })
    res.status(200).send("room deleted successfully");
}


module.exports = { getAllRoomsFromModel, createRoom, bookRoom, deleteRoom };