import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    address: {
        type:String,
        default: ""
    },
    city : {
        type:String,
        default: ""
    },
    state : {
        type:String,
        default: ""
    },
    pincode : {
        type:String,
    },
    country : {
        type:String,
    },
    mobile : {
        type:Number,
        default: "null"
    },
    status : {
        type:Boolean,
        default: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:"User",
        required: ""
    }
},{
    timestamps:true
})

const AddressModel = mongoose.model("Address", addressSchema);

export default AddressModel