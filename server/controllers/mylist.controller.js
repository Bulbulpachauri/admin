import MyListModel from "../models/myList.model.js";

export const addToMyListController = async (request, response) => {
    try {

        const userId = request.userId; //middleware
        const { 
            productId,
            productTitle,
            image,
            rating,
            price,
            oldprice,
            brand,
            discount
        } = request.body;

        const item = await MyListModel.findOne({
            userId: userId,
            productId: productId,
        });


        if (item) {
            return response.status(400).json({
                message: "Item already in my List",
            });
        }

        const myList = new MyListModel({
            productId,
            userId,
            productTitle,
            image,
            rating,
            price,
            oldprice,
            brand,
            discount,
            userId
        })

        const save = await myList.save();

        return response.status(200).json({
            error:false,
            success:true,
            message: "The product added in the my list",
        })

    } catch (error) {
        response.status(500).json({
            message: "error.message || error",
            error: true,
            status: false,
        });
    }
}

export const deleteToMyListController = async(request,response)=>{
    try{

        constmyListItem = await MyListModel.findById(request.params.id);

        if(!myListItem){
            return response.status(404).json({
                error: true,
                success: false,
                message: "The item with this given id was not found"
            })
        }


        const deleteItem = await MyListModel.findByIdAndDelete(request.params.id);

        if(!deleteItem){
            return response.status(404).json({
                error: true,
                success: false,
                message: "The item is not deleted"
            })
        }


        return response.status(200).json({
            error: false,
            success: true,
            message: "The item removed from My List",
        })

    }catch(error){
        return response.status(500).json({
            message: "error.message || error",
            error: true,
            status: false,
        });
    }
}

export const getMyListController = async(request,response)=>{
    try{

        const userId = request.userId;

        const myListItems = await MyListModel.find({
            userId:userId
        })

            return response.status(200).json({
                error: true,
                success: false,
                data: myListItems
            })

    }catch(error){
        return response.status(500).json({
            message: "error.message || error",
            error: true,
            status: false,
        });
    }
}