const OrderDB = require('../module/orderSchema')

const orderControler = {
    addOrder: async (req, res)=>{
        const{customerNumber, customerName, orders} = req.body
        let order = await OrderDB.findOne({customerNumber : customerNumber})
        if(order){
            order.orders.push(orders)
            console.log(order)
            order.save();
            res.status(200).send({message: "Order updated successfully"})
        }
        else{
            await OrderDB.create(req.body)
            res.status(200).send({message:"Order created successfully"})
        }
    },
    getOrder : async(req, res)=>{
        try {
            const{customerNumber}=req.body
            let order = await OrderDB.findOne({customerNumber:customerNumber})
           if(order){
            res.status(200).send({message : order})
           }
           else{
            res.send({message:''})
           }
        } catch (error) {
            res.send({message: error})
        }
    },
    getAllOrder: async(req, res)=>{
        let order = await OrderDB.find();
        res.status(200).send(order)
    }
}

module.exports = orderControler