import AddressModel from "../models/address.model";
import UserModel from "../models/user.model";

export const addAddressController = async (request, response) => {
    try {
        const {address_line1, city, state, pincode, country, mobile, status} = request.body;

        const userId = request.userId; // Get from authenticated user

        if(!address_line1 || !city || !state || !pincode || !country || !mobile || !status){
            return response.status(400).json({
                message: "Please provide all the fields",
                error: "All fields are required",
                success: false
            })
        }

        if(!userId){
            return response.status(401).json({
                message: "User not authenticated",
                error: "Authentication required",
                success: false
            })
        }

        const address = new AddressModel({
            address: address_line1, // Model expects 'address', not 'address_line1'
            city,
            state,
            pincode,
            country,
            mobile: parseInt(mobile), // Model expects Number
            status: status === 'true', // Convert string to boolean
            userId
        })

        const savedAddress = await address.save();

        const updateCartUser = await UserModel.updateOne({_id: userId },{
            $push: {
                address_details: savedAddress._id
            }
        })


        return response.status(200).json({
            message: "Address added successfully",
            data: savedAddress,
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