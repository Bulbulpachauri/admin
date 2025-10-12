import { Router } from 'express';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { createCategory, deletCategory, getCategories, getCategoryCount, getSubCategoryCount, removeImageFromCloudinary, updateCategory, uploadImages } from '../controllers/category.controller.js';

const categoryRouter = Router();

categoryRouter.post('/uploadImage', auth, upload.array('image'), uploadImages);
categoryRouter.post('/create', auth, createCategory);
categoryRouter.get('/',getCategories);
categoryRouter.get('/get/count',getCategoryCount);
categoryRouter.get('/get/count/subCat',getSubCategoryCount);
categoryRouter.get('/:id', getCategories);
categoryRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
categoryRouter.delete('/:id', auth, deletCategory);
categoryRouter.put('/:id', auth, updateCategory);

export default categoryRouter;