import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    state: {
        type: String,
        required: [true, "State is required"]
    },
    pincode: {
        type: String,
        required: [true, "Pincode is required"]
    },
    country: {
        type: String,
        required: [true, "Country is required"]
    },
    mobile: {
        type: Number,
        required: [true, "Mobile number is required"]
    },
    status: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

const AddressModel = mongoose.model("address", addressSchema);

export default AddressModel;