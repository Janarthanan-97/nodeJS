const OrderDB = require('../module/orderSchema')

const orderControler = {
    addOrder: async (req, res)=>{
        const{customerNumber, customerName, orders} = req.body
        console.log(orders[0].items)
        let order = await OrderDB.findOne({customerNumber : customerNumber})
        if(order){
            order.orders.push({items:orders[0].items})
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
            res.status(200).send({message : order})
        } catch (error) {
            res.send({message: error})
        }
    }
}

module.exports = orderControler