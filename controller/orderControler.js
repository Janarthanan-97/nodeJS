const OrderDB = require('../module/orderSchema')
const ItemDB = require('../module/itemSchema')

const orderControler = {
    addOrder: async (req, res) => {
        try {
            const { customerNumber, customerName, orders } = req.body
            let billItem = orders.items
            for (let i = 0; i < billItem.length; i++) {
                let item = await ItemDB.findById(billItem[i].id)
                if (item) {
                    item.stock = item.stock - billItem[i].quantity
                    item.save()
                }
            }
            /////////
            let order = await OrderDB.findOne({customerNumber : customerNumber})
            if(order){
                order.orders.push(orders)
                order.save();
                res.status(200).send({message: "Order updated successfully"})
            }
            else{
                await OrderDB.create(req.body)
                res.status(200).send({message:"Order created successfully"})
            }
        } catch (error) {
            res.send({ message: error })
        }
    },
    getOrder: async (req, res) => {
        try {
            const { customerNumber } = req.body
            let order = await OrderDB.findOne({ customerNumber: customerNumber })
            if (order) {
                res.status(200).send({ message: order })
            }
            else {
                res.send({ message: '' })
            }
        } catch (error) {
            res.send({ message: error })
        }
    },
    getAllOrder: async (req, res) => {
        let order = await OrderDB.find();
        res.status(200).send(order)
    }
}

module.exports = orderControler