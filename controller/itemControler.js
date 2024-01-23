const ItemDB = require('../module/itemSchema')

const itemControler = {
    addItem: async (req, res) => {
        try {
        let newItem = req.body;
        newItem.name = newItem.name.toUpperCase();
        let item = await ItemDB.findOne({name: newItem.name});
        
        if(item){
            // item.stock = await Number(item.stock) + Number(newItem.stock);
            // item.price = newItem.price;
            // item.save()
            res.status(200).send({message:"Item already exist"})
        }
       else{
        await ItemDB.create(newItem)
        res.status(200).send({message: "Item added successfully"})
       }
        } catch (error) {
            res.send({message: error})
        }
    },
    getItem: async(req, res)=>{
        try {
            const item = await ItemDB.find();
            res.status(200).send({message: item})
        } catch (error) {
            res.send({message: error})
        }
    },

    updateItem: async(req, res)=>{
        let {id, price, stock} = req.body
        let item = await ItemDB.findOne({_id:id})
        item.price = price;
        item.stock = stock;
        item.save()
        res.status(200).send({message: 'Item updated successfully'})
    },
    deleteItem: async (req, res)=>{
        let {id} = req.body
        await ItemDB.deleteOne({_id: id});
        res.status(200).send({message: "Item deleted successfully"})
    }
}

module.exports = itemControler