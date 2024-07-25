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
        let property = await Property.updateOne({_id: id}, {title, price, location, type, pic, sold, user, booked})    
        res.status(200).send("property updated succesfully")
    }
   } catch (error) {
    
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

module.exports = {getProperties, updateProperty, getMyProperty}
