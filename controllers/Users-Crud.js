let userAPIModel = require('../models/schemaForUser')
let roomBookingAPIModel = require('../models/schemaForDB.js')
let jwt = require('jsonwebtoken')


const getAllUserFromModel = async (req, res) => {
    try {
        let user = await userAPIModel.find()
        res.status(200).send(user)

    } catch (error) {
        res.send(error);
    }
}

const login = async (req, res)=>{
    const SECRET = "APPLE";
    const {userName, password} = req.body;
    const user = await userAPIModel.findOne({'userID': userName});
    if(user==null){
        return res.status(400).send({message: "User not found"})
    }
    if(password == user.password){
        const token = jwt.sign({
       userName
        }, SECRET)
        res.status(200).send(token)
    }
    else{
        res.status(400).send('Incorrect password')
    }
   
}

const getRoomsForUser = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await userAPIModel.findById(id);
        let roomBookedByUser = await roomBookingAPIModel.find({ "BookingHistory.userID": user.userID })
        let roomsArray = [];
        for (let i = 0; i < roomBookedByUser.length; i++) {
            let roomObject = { roomName: roomBookedByUser[i].name }
            roomBookedByUser[i].BookingHistory.forEach((e) => {
                if (e.userID == user.userID) {
                    roomObject = {
                        ...roomObject,
                        startDate: e.startDate,
                        endDate: e.endDate
                    }
                    roomsArray.push(roomObject);
                }
            })
        }

        res.status(200).send(roomsArray)

    } catch (error) {
        res.send(error);
    }

}

let createUser = async (req, res) => {
    try {

        let user = await userAPIModel.findOne({ userID: req.body.userID })

        if (user) {
            res.send({ message: "UserID already exist" });
        }
        else {
            await userAPIModel.create(req.body);
            res.send({ message: "New user created succesfully" });
        }

    } catch (error) {
        res.send(error);
    }
}

let UpdateUser = async (req, res) => {
    let { id } = req.params;
    await userAPIModel.findByIdAndUpdate(id, req.body)
        .then(updatedUser => {
            if (updatedUser) {
                res.status(200).json({ message: 'user updated successfully' });
            } else {
                res.status(404).json({ message: 'id does not exist' });
            }
        });
}

let deleteUser = async (req, res) => {
    let { id } = req.params;
    await userAPIModel.deleteOne({ _id: id })
    res.send("deleted succesfully");
}


module.exports = { getAllUserFromModel, getRoomsForUser, login, createUser, UpdateUser, deleteUser };