import ProductModel from "../models/product.model.js";

import { v2 as cloudinary } from 'cloudinary';
import { Console, error } from "console";
import fs from 'fs';


cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true,
});


//image upload
var imagesArr = [];
export async function uploadImages(request, response) {
    try {
        imagesArr = [];

        const image = request.files;

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i = 0; i < image?.length; i++) {
            const result = await cloudinary.uploader.upload(
                image[i].path,
                options,
                function (error, result) {
                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`uploads/${request.files[i].filename}`)
                }
            );
        }

        return response.status(200).json({
            images: imagesArr
        });


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


//create product
export async function createProduct(request, response) {
    try {
        let product = new ProductModel({
            name: request.body.name,
            description: request.body.description,
            images: imagesArr,
            brand: request.body.brand,
            price: request.body.price,
            oldPrice: request.body.oldPrice,
            catName: request.body.catName,
            catId: request.body.catId,
            subCatId: request.body.subCatId,
            subCat: request.body.subCat,
            thirdsubCat: request.body.thirdsubCat,
            thirdsubCatId: request.body.thirdsubCatId,
            countInStock: request.body.countInStock,
            rating: request.body.rating,
            isFeatured: request.body.isFeatured,
            discount: request.body.discount,
            productRam: request.body.productRam,
            size: request.body.size,
            productWeight: request.body.productWeight,

        });

        product = await product.save();

        if (!product) {
            return response.status(500).json({
                message: "Product Not created!",
                error: true,
                success: false,
                product: product
            });
        }


        imagesArr = [];

        response.status(200).json({
            message: "Product created successfully!",
            error: false,
            success: true,
            product: product
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


//get all products
export async function getAllProducts(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perpage = parseInt(request.query.perpage) || 10;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perpage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found!",
                error: true,
                success: false
            });
        }

        const products = await ProductModel.find().populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (!products) {
            return response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            Page: page,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


//get all products by category id
export async function getAllProductsByCatId(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perpage = parseInt(request.query.perpage) || 10;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perpage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found!",
                error: true,
                success: false
            });
        }

        const products = await ProductModel.find().populate("category")
        catId: request.params.id
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (!products) {
            return response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            Page: page,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


//get all products by category name
export async function getAllProductsByCatName(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perpage = parseInt(request.query.perpage) || 10000;


        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perpage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found!",
                error: true,
                success: false
            });
        }

        const products = await ProductModel.find().populate("category")
        catName: request.query.catName
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (!products) {
            return response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            Page: page,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}



//get all products by sub category id
export async function getAllProductsBySubCatId(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perpage = parseInt(request.query.perpage) || 10;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perpage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found!",
                error: true,
                success: false
            });
        }

        const products = await ProductModel.find().populate("category")
        subCatId: request.params.id
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (!products) {
            return response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            Page: page,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


//get all products by sub category name
export async function getAllProductsBySubCatName(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perpage = parseInt(request.query.perpage) || 10000;


        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perpage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found!",
                error: true,
                success: false
            });
        }

        const products = await ProductModel.find().populate("category")
        subCat: request.query.subCat
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (!products) {
            return response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            Page: page,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}



//get all products by sub category id
export async function getAllProductsByThirdLavelCatId(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perpage = parseInt(request.query.perpage) || 10;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perpage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found!",
                error: true,
                success: false
            });
        }

        const products = await ProductModel.find().populate("category")
        thirdsubCatId: request.params.id
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (!products) {
            return response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            Page: page,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


//get all products by sub category name
export async function getAllProductsByThirdLavelCatName(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perpage = parseInt(request.query.perpage) || 10000;


        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perpage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found!",
                error: true,
                success: false
            });
        }

        const products = await ProductModel.find().populate("category")
        thirdsubCat: request.query.thirdsubCat
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (!products) {
            return response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            Page: page,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


//get all products by price
export async function getAllProductsByPrice(request, response) {
    let productList = [];

    if (request.query.catId !== "" && request.query.price !== "") {
        const productListArr = await ProductModel.find({
            catId: request.query.catId,
        }).populate("category");

        productList = productListArr;
    }

    if (request.query.subCatId !== "" && request.query.price !== "") {
        const productListArr = await ProductModel.find({
            subCatId: request.query.subCatId,
        }).populate("category");

        productList = productListArr;
    }

    if (request.query.thirdsubCatId !== "" && request.query.price !== "") {
        const productListArr = await ProductModel.find({
            thirdsubCatId: request.query.thirdsubCatId,
        }).populate("category");

        productList = productListArr;
    }



    const filteredProducts = productList.filter((product) => {
        if (request.query.minPrice && product.price < parseInt(+request.query.minPrice)) {
            return false;
        }
        if (request.query.maxPrice && product.price > parseInt(+request.query.maxPrice)) {
            return false;
        }
    });

    return response.status(200).json({
        error: false,
        success: true,
        products: filteredProducts,
        totalPages: 0,
        page: 0,
    });

}


//get all products by rating
export async function getAllProductsByRating(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perpage = parseInt(request.query.perpage) || 10000;


        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perpage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found!",
                error: true,
                success: false
            });
        }

        console.log(request.query.subCatId)

        let products = [];

        if (request.query.catId !== undefined) {

            products = await ProductModel.find({
                rating: request.query.rating,
                catId: request.query.catId,

            }).populate("category")
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        }

         if (request.query.subCatId !== undefined) {

            products = await ProductModel.find({
                rating: request.query.rating,
                subCatId: request.query.subCatId,

            }).populate("category")
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        }
         if (request.query.thirdsubCatId !== undefined) {

            products = await ProductModel.find({
                rating: request.query.rating,
                thirdsubCatId: request.query.thirdsubCatId,

            }).populate("category")
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        }


        if (!products) {
            return response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            Page: page,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}



//get all products count
export async function getProductsCount(request, response) {
    try {
        const productsCount = await ProductModel.countDocuments();

        if (!productsCount) {
            response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            productsCount: productsCount,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


//get all featured products
export async function getAllFeaturedProducts(request, response) {
    try {
        
        const products = await ProductModel.find({
            isfeatured: true,
        }).populate("category");

        if (!products) {
        response.status(500).json({
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}



//delete product
export async function deleteProduct(request, response){
    const product = await ProductModel.findById(request.params.id).populate("category");

    if(!product){
        return response.status(500).json({
            message:"Product Not found!",
            error:true,
            success:false
        })
    }

    const images = product.images;
    
    let img="";
    for (img of images){
        const imgUrl = img;
        const urlArr = imgUrl.split("/");
        const imgName = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];

        if(imageName){
            cloudinary.uploader.destroy(imageName, (error, result) => {
                //console.log(error, result);
            });
        }
        
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(request.params.id);

    if(!deletedProduct){
        response.status(404).json({
            message:"Product Not deleted!",
            error:true,
            success:false
        });
    }

    return response.status(200).json({
        message:"Product deleted!",
        error:false,
        success:true
    });
}


//get single product
export async function getProduct(request, response){
    try {
        const product = await ProductModel.findById(request.params.id).populate("category");

    if(!product){
        return response.status(404).json({
            message:"The product is not found!",
            error:true,
            success:false
        })
    }

    return response.status(200).json({
        error:false,
        success:true,
        product:product,
    });

} catch (error){
    return response.status(500).json({
        message:error.message || error,
        error:false,
        success:true,
    });
    }
}

//delete images
export async function removeImageFromCloudinary(request, response) {
    const imgUrl = request.query.img;

    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    if (imageName) {
        const result = await cloudinary.uploader.destroy(
            imageName,
            (error, result) => {
                // console.log(error,res)
            }
        );

        if (res) {
            response.status(200).send(res);
        }
    }
}


//updated product
export async function updateProduct(request,response){
    try {
        const product = await ProductModel.findByIdAndUpdate(
            request.params.id,request.body,
        {
            name: request.body.name,
            subCat: request.body.subCat,
            description: request.body.description,
            images: request.body.images,
            brand: request.body.brand,
            price: request.body.price,
            oldPrice: request.body.oldPrice,
            catId: request.body.catId,
            catName: request.body.catName,
            subCat: request.body.subCat,
            subCatId: request.body.subCatId,
            categort: request.body.categort,
            thirdsubCat: request.body.thirdsubCat,
            thirdsubCatId: request.body.thirdsubCatId,
            countInStock: request.body.countInStock,
            rating: request.body.rating,
            isfeatured: request.body.isfeatured,
            productRam: request.body.productRam,
            size: request.body.size,
            productWeight: request.body.productWeight,
        },
        {new:true}
        );


        if(!product){
         return response.status(404).json({
                message:"The product is not be updated!",
                success:false
            })
        }

        imagesArr = [];

        return response.status(200).json({
            message:"The product is updated!",
            error:false,
            success:true,
        }); 

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}