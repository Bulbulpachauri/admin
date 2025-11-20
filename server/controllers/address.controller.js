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
            address: address_line1,
            city,
            state,
            pincode,
            country,
            mobile,
            status,
            userId
        })

        const savedAddress = await addresses.save();
        console.log('Address saved:', savedAddress);

        const updateCartUser = await UserModel.updateOne({_id: userId },{
            $push: {
                address_details: savedAddress._id
            }
        })
        console.log('User updated:', updateCartUser);

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
        console.log('Getting addresses for userId:', userId);
        console.log('UserId type:', typeof userId);
        
        // Get all addresses to debug
        const allAddresses = await AddressModel.find({});
        console.log('All addresses in DB:', allAddresses);
        
        const addresses = await AddressModel.find({ userId });
        console.log('Found addresses for user:', addresses);
        console.log('Number of addresses found:', addresses.length);
        
        return response.status(200).json({
            message: "Addresses fetched successfully",
            data: addresses,
            success: true
        })
        
    } catch (error) {
        console.error('Error in getAddressController:', error);
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateAddressController = async (request, response) => {
    try {
        const { addressId } = request.body;
        const userId = request.userId;

        if (!addressId) {
            return response.status(400).json({
                message: "Address ID is required",
                error: true,
                success: false
            })
        }

        // Verify the address belongs to the user
        const address = await AddressModel.findOne({ _id: addressId, userId });
        if (!address) {
            return response.status(404).json({
                message: "Address not found",
                error: true,
                success: false
            })
        }

        // Set all user addresses to inactive
        await AddressModel.updateMany({ userId }, { status: false });
        
        // Set selected address to active
        await AddressModel.updateOne({ _id: addressId }, { status: true });

        return response.status(200).json({
            message: "Address updated successfully",
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