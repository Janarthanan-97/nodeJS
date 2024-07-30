const Property = require('../module/PropertyModel')

const getProperties = async(req, res)=>{

    try {
        let property = await Property.find()
        res.status(200).send(property)
    } catch (error) {
        res.status(401).send(error)
    }
}
const updateProperty = async(req, res)=>{
    const user = req.user._id
    let { id, title, price, location, type, pic, sold, booked} = req.body
    
   try {
    if(id == ''){
        let property = await Property.create({title,  price, location, type, pic, sold, user, booked})
        res.status(200).send("property created succesfully")

    }
    else{
        console.log(req.body)
        let property = await Property.findByIdAndUpdate(_id, {
            _id,
             title, 
             location,
             type,
             price,
             pic,
             sold,
             booked,
             user,
            })    
        res.status(200).send("property updated succesfully")
    }
   } catch (error) {
    console.log(error)
        res.status(401).send(error)
   }
}

const getMyProperty = async(req, res)=>{
    let user = req.user

    try {
        let property = await Property.find({user:user})
        res.status(200).send(property)
    } catch (error) {
        res.status(401).send(error)
    }
    
}

const getPropertyByID = async(req, res)=>{
    let {id}= req.params
    try {
        let property = await Property.findById(id)
        res.status(200).send(property)
    } catch (error) {
        res.status(401).send(error)
    }
}

const deleteProperty = async(req, res)=>{
    const {id} = req.params
    try {
        let property = await Property.deleteOne({_id:id})
        res.status(200).send("Deleted")

    } catch (error) {
        res.status(401).send(error)
    }
}

module.exports = {getProperties, updateProperty, getMyProperty, getPropertyByID, deleteProperty}
