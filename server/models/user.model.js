import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"],
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Provide password"],
    },
    avatar: {
        filename: String,
        secure_url: String
    },
    phone: {
        type: String,
        required: [true, "Provide phone number"]
    },
    mobile: {
        type: String,
        default: null
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    access_token: {
        type: String,
        default: ''
    },
    refresh_token: {
        type: String,
        default: ''
    },
    last_login_date: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ["active", "inactive", "Suspended"],
        default: "active"
    },
    address_details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "address"
        }
    ],
    shopping_cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cart"
        }
    ],
    ordersHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "order"
        }
    ],
    otp: {
        type: String
    },
    otpExprise: {
        type: Date
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},
    { timestamps: true }
)

const UserModel = mongoose.model("User", userSchema);

export default UserModel
