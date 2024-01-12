const mongoose = require('./mongooseConnect')

const itemSchema = new mongoose.Schema({
    name:{type:String, required:[true, 'Item name is required']},
    price:{type:Number, required:[true, 'Price is required']},
    stock:{type:Number, required:[true, 'Number of stock is required']}
},{
    collation: "items",
    versionKey:false,
    collation: { locale: 'en_US', strength: 1 }
})

const ItemDB = mongoose.model('items', itemSchema)

module.exports = ItemDB

