let roomBookingAPIModel = require('../models/schemaForDB.js')

const getAllRoomsFromModel = async(req, res)=>{
    try {
        let rooms = await roomBookingAPIModel.find()
        res.status(200).send({
            message:"Users list Fetched",
            rooms
        })

    } catch (error) {
        console.log(error.message)
    }
}

let createRoom = async (req, res)=>{
    try {
        await roomBookingAPIModel.create(req.body);
    } catch (error) {
        console.log(error)
    }
}

let bookRoom = async (req, res)=>{
    let {id} = req.params;
    let selectedRoom = await roomBookingAPIModel.findById(id);
    selectedRoom.BookingHistory.push(req.body);
    selectedRoom.save();
    console.log(selectedRoom);

}

let deleteRoom = async (req, res)=>{
    let {id} = req.params;
    await roomBookingAPIModel.deleteOne({_id: id})
}


module.exports = {getAllRoomsFromModel, createRoom, bookRoom, deleteRoom};