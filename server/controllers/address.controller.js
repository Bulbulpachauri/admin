import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (request, response) => {
    try {
        const {address_line1, city, state, pincode, country, mobile, status} = request.body;

        let userId = request.userId; // Get from authenticated user

        if(!userId){
            return response.status(401).json({
                message: "User not authenticated",
                error: true,
                success: false
            })
        }

        if(!address_line1 || !city || !state || !pincode || !country || !mobile ){
            return response.status(400).json({
                message: "Please provide all the fields",
                error: true,
                success: false
            })
        }

        const addresses = new AddressModel({
            address: address_line1, city, state, pincode, country, mobile, status, userId
        })

        const savedAddress = await addresses.save();

        const updateCartUser = await UserModel.updateOne({_id: userId },{
            $push: {
                address_details: savedAddress._id
            }
        })

        return response.status(200).json({
            message: "Address added successfully",
            data: savedAddress,
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getAddressController = async (request, response) => {
    try {
        const userId = request.userId;
        
        const addresses = await AddressModel.find({ userId }).populate('userId', 'name email');
        
        return response.status(200).json({
            message: "Addresses fetched successfully",
            data: addresses,
            success: true
        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}