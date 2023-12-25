let roomBookingAPIModel = require('../models/schemaForDB.js')
let isDateAvailable = require('../operations/bookingDateAvailableChec.js')
let userDB = require('../models/schemaForUser.js')

const getAllRoomsFromModel = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        let user = await userDB.findOne({ userID: req.userID });
        if (user) {
            let rooms = await roomBookingAPIModel.find()
            if (startDate != '' && endDate != '') {
                const roomArray = [];
                rooms.map(ele => {
                    if (isDateAvailable(ele.BookingHistory, req.body)) {
                        roomArray.push(ele)
                    }
                })
                res.status(200).send(roomArray);
            }
            else {
                res.status(200).send(rooms)
            }

        }
    } catch (error) {
        res.send(error);
    }
}

const getMyRooms = async (req, res) => {
    try {
        const userID = req.userID
        let filteredMyRoom = []
        let myRooms = await roomBookingAPIModel.aggregate([
            { $match: { "BookingHistory.userID": userID } },
            { $unwind: "$BookingHistory" }
        ])
        myRooms.map(e => {
            if (e.BookingHistory.userID == userID) {
                filteredMyRoom.push(e)
            }
        })
        res.status(200).send(filteredMyRoom)
    } catch (error) {
        res.send(error)
    }
}

let createRoom = async (req, res) => {
    try {
        let name = req.body.name.toUpperCase();
        const object = {...req.body, name};
        let room = await roomBookingAPIModel.findOne({ name: name})
        if (!room) {
            await roomBookingAPIModel.create(object);
            res.status(200).send("Room created succesfully");
        }
        else {
            res.status(200).send("Room name already exist")
        }
    } catch (error) {
        res.send(error);
    }
}

let bookRoom = async (req, res) => {
    let { id } = req.params;
    let userID = req.userID
    let { startDate, endDate } = req.body
    console.log(id, userID, req.body);
    let selectedRoom = await roomBookingAPIModel.findById(id);
    if (req.body.startDate && req.body.endDate) {

        let bookingHistoryArray = selectedRoom.BookingHistory;
        if (isDateAvailable(bookingHistoryArray, { startDate, endDate })) {
            selectedRoom.BookingHistory.push({ userID, startDate, endDate });
            selectedRoom.save();
            res.status(200).send("Room booked succesfully");
        }
        else {
            res.send({ message: "Room is already booked" });
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


module.exports = { getAllRoomsFromModel, createRoom, bookRoom, deleteRoom, getMyRooms };