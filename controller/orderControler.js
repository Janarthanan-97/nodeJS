const OrderDB = require('../module/orderSchema')
const ItemDB = require('../module/itemSchema')

const orderControler = {
    addOrder: async (req, res) => {
        try {
            //////items////////////
            const { customerNumber, customerName, orders } = req.body
            let billItem = orders.items
            let dd = new Date().getDate()
            let mm = new Date().getMonth() + 1
            let yy = new Date().getFullYear()
            let date = `${dd}/${mm}/${yy}`
            //////////////////
            for (let i = 0; i < billItem.length; i++) {
                let item = await ItemDB.findById(billItem[i].id)
                let l = item.sale.length
                if (item) {
                    item.stock = item.stock - billItem[i].quantity
                }
                if(item.sale[l-1].date == date){
                   item.sale[l-1].quantity = item.sale[l-1].quantity + +billItem[i].quantity;
                   item.save()
                   await ItemDB.findByIdAndUpdate(item._id, item)
                }
                else{
                    item.sale[l] = {date, quantity: +billItem[i].quantity}
                    item.save()
                }
            }
            let order = await OrderDB.findOne({ customerNumber: customerNumber })
            if (order) {
                order.orders.push(orders)
                order.save();
                res.status(200).send({ message: "Order updated successfully" })
            }
            else {
                await OrderDB.create(req.body)
                res.status(200).send({ message: "Order created successfully" })
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
                // console.log(order)
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