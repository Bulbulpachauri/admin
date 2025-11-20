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

// Pre-save hook to ensure only one active address per user
addressSchema.pre('save', async function(next) {
    if (this.status === true && this.isModified('status')) {
        // Set all other addresses of this user to inactive
        await mongoose.model('address').updateMany(
            { userId: this.userId, _id: { $ne: this._id } },
            { status: false }
        );
    }
    next();
});

const AddressModel = mongoose.model("address", addressSchema);

export default AddressModel;