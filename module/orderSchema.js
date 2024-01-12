const mongoose = require('./mongooseConnect')

const orderSchema = new mongoose.Schema({
    customerName:{type:String, required:[true, 'Customer Name is required']},
    customerNumber:{type:String, required:[true, 'Customer mobile numder is required']},
    orders:[{
        date: {type:Date, default: Date()},
        items:[{
            id: {type: mongoose.Schema.Types.ObjectId},
            quantity: {type:Number}
        }]
    }]
},{
    collation: 'orders',
    versionKey:false,
    collation:{locale:'en_US'}
})

const OrderDB = mongoose.model("orders",orderSchema)

module.exports = OrderDB

