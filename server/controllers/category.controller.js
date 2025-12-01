import CategoryModel from '../models/category.model.js';

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});


//image upload
export async function uploadImages(request, response) {
    try {
        console.log('Upload request received');
        console.log('Files:', request.files);
        
        const images = request.files;
        if (!images || images.length === 0) {
            console.log('No images provided');
            return response.status(400).json({
                message: "No images provided",
                error: true,
                success: false
            });
        }

        // For now, just return placeholder URLs to test the flow
        const imageUrls = [];
        
        for (let i = 0; i < images.length; i++) {
            // Create a simple URL for testing
            const imageUrl = `http://localhost:8000/uploads/${images[i].filename}`;
            imageUrls.push(imageUrl);
        }

        console.log('Returning image URLs:', imageUrls);
        
        return response.status(200).json({
            images: imageUrls,
            success: true,
            error: false
        });

    } catch (error) {
        console.log('Upload error:', error);
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}



//create category
export async function createCategory(request, response) {
    try {
        console.log('Create category request body:', request.body);
        
        if (!request.body.name || request.body.name.trim() === '') {
            return response.status(400).json({
                message: "Category name is required",
                error: true,
                success: false
            })
        }

        // Ensure images is an array
        let images = request.body.images;
        if (typeof images === 'string') {
            images = [images];
        } else if (!Array.isArray(images)) {
            images = [];
        }

        let category = new CategoryModel({
            name: request.body.name.trim(),
            images: images,
            parentId: request.body.parentId || null,
            parentCatName: request.body.parentCatName || '',
        });

        console.log('Category object before save:', category);
        
        category = await category.save();
        console.log('Category saved successfully:', category);

        return response.status(201).json({
            message: "Category created",
            error: false,
            success: true,
            category: category
        })

    } catch (error) {
        console.log('Create category error:', error);
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


//get categories
export async function getCategories(request, response) {
    try {
        console.log('Getting categories...');
        const categories = await CategoryModel.find();
        console.log('Found categories:', categories.length);
        
        if (!categories || categories.length === 0) {
            return response.status(200).json({
                error: false,
                success: true,
                data: []
            });
        }

        const categoryMap = {};

        categories.forEach((category) => {
            categoryMap[category._id] = { ...category._doc, children: [] };
        });

        const rootCategories = [];

        categories.forEach(category => {
            if (category.parentId && categoryMap[category.parentId]) {
                categoryMap[category.parentId].children.push(categoryMap[category._id]);
            } else {
                rootCategories.push(categoryMap[category._id]);
            }
        });

        console.log('Returning root categories:', rootCategories.length);
        return response.status(200).json({
            error: false,
            success: true,
            data: rootCategories
        });

    } catch (error) {
        console.log('Get categories error:', error);
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


//get catyegory count
export async function getCategoryCount(request, response) {
    try {
        const categoriesCount = await CategoryModel.countDocuments({ parentId: undefined });
        if (!categoriesCount) {
            response.status(500).json({ success: false, error: true });
        }
        else {
            response.send({
                categoriesCount: categoriesCount
            });
        }
        return response.status(200).json({
            error: false,
            success: true,
            data: count
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//get sub category count
export async function getSubCategoryCount(request, response) {
    try {
        const categories = await CategoryModel.find();
        if (!categories) {
            response.status(500).json({ success: false, error: true });
        }

        else {
            const subcatList = [];
            for (let cat of categories) {
                if (cat.parentId !== undefined) {
                    subcatList.push(cat);
                }
            }


            response.status(200).send({
                SubcategoriesCount: subcatList.length,
            });
        }

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


//get single category
export async function getCategory(request, response) {
    try {
        const category = await Category.findById(request.params.id);

        if (!category) {
            response
                .status(500)
                .json(
                    {
                        message: 'The category with the given ID was not found.',
                        error: true,
                        success: false
                    }
                );
        }


        return response.status(200).json({
            error: false,
            success: true,
            category: category
        });


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


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


export async function deletCategory(request, response) {
    const category = await CategoryModel.findByIdAndRemove(request.params.id);
    const images = category.images;
    let img = "";
    for (img of images) {
        const imgUrl = img;
        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];

        if (imageName) {
            cloudinary.uploader.destroy(imageName, (error, result) => {
                // console.log(error, res)
            });
        }

    }

    const subCategory = await CategoryModel.find({
        parentId: request.params.id
    });


    for (let i = 0; i < subCategory.length; i++) {

        const thirdsubCategory = await Category.find({
            parentId: subCategory[i]._id
        });

        for (let i = 0; i < thirdsubCategory.length; i++) {
            const deletedThirdSubCat = await CategoryModel.findByIdAndDelete(thirdsubCategory[i]._id);
        }

        const deletedSubCat = await CategoryModel.findByIdAndDelete(subCategory[i]._id);
    }

    const deletedCat = await CategoryModel.findByIdAndDelete(request.params.id);
    if (!deletedCat) {
        response.status(404).json({
            message: "Category not found!",
            error: true,
            success: false
        });
    }

    response.status(200).json({
        message: "Category Deleted!",
        error: false,
        success: true
    });
}

export async function updateCategory(request, response) {
    const category = await CategoryModel.findByIdAndUpdate(
        request.params.id,
        {
            name: request.body.name,
            images: imagesArr.length>0 ? imagesArr[0] : request.body.images,
            parentId: request.body.parentId,
            parentCatName: request.body.parentCatName
        },
        { new: true }

    );
    if (!category) {
        return response.status(500).json({
            message: "Category cannot be updated!",
            error: true,
            success: false
        });
    }


    imagesArr = [];

    response.status(200).json({
        error: false,
        success: true,
        category: category
    })

}

