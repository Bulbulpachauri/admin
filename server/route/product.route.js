import { Router } from 'express';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { createProduct, deleteProduct, getAllFeaturedProducts, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, getAllProductsByPrice, getAllProductsByRating, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsByThirdLavelCatId, getAllProductsByThirdLavelCatName, getProduct, getProductsCount, removeImageFromCloudinary, updateProduct, uploadImages } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post('/uploadImage', auth, upload.array('image'), uploadImages);
productRouter.post('/create', auth, createProduct);
productRouter.get('/getAllProducts',getAllProducts);
productRouter.get('/getAllProductsByCatId/:id',getAllProductsByCatId);
productRouter.get('/getAllProductsByCatName/:name',getAllProductsByCatName);
productRouter.get('/getAllProductsBySubCatId/:id',getAllProductsBySubCatId);
productRouter.get('/getAllProductsBySubCatName/:name',getAllProductsBySubCatName);
productRouter.get('/getAllProductsByThirdSubCatId/:id',getAllProductsByThirdLavelCatId);
productRouter.get('/getAllProductsByThirdSubCatName/:name',getAllProductsByThirdLavelCatName);
productRouter.get('/getAllProductsByPrice', getAllProductsByPrice);
productRouter.get('/getAllProductsByRating', getAllProductsByRating);
productRouter.get('/getProductsCount', getProductsCount);
productRouter.get('/getAllFeaturedProducts', getAllFeaturedProducts);
productRouter.delete('/:id', deleteProduct);
productRouter.get('/:id', getProduct);
productRouter.delete('/deleteImage/:id', auth, removeImageFromCloudinary);
productRouter.put('/updateproduct/:id', auth, updateProduct);


export default productRouter;