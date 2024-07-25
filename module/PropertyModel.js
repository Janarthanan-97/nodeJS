const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        title: { type: "String", required: true },
        location: { type: "String", unique: true, required: true },
        type: { type: "String", required: true },
        price:{type:'string', required:true},
        pic:{type:'string', required:true},
        sold:{type:Boolean, default:false},
        booked:{type:Boolean, default:false},
        user: {type: mongoose.Schema.Types.ObjectId, ref:'users', required:true},

    },
    { 
      versionKey:false
    }
)



const Property = mongoose.model("properties", userSchema);

module.exports = Property;