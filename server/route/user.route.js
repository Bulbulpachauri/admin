import { Router } from 'express';
import { loginUserController, logoutController, registerUserController, verifyEmailController, useAvatarController, removeImageFromCloudinary, updateUserDetails, forgotPasswordController, verifyForgotPasswordOtp, resetPassword, refreshToken, userDetails } from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const userRouter = Router();
userRouter.post('/register', registerUserController);
userRouter.post('/verifyEmail', verifyEmailController);
userRouter.post('/login', loginUserController);
userRouter.post('/logout', auth, logoutController);
userRouter.put('/user-avatar', auth, upload.array('avatar'), useAvatarController);
userRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
userRouter.put('/:id', auth,updateUserDetails);
userRouter.post('/forgot-password', forgotPasswordController);
userRouter.post('/verify-forgot-password-otp', verifyForgotPasswordOtp);
userRouter.post('/reset-password',resetPassword);
userRouter.post('/refresh-token', refreshToken)
userRouter.get('/user-details',auth,userDetails)
userRouter.get('/test-auth', auth, (req, res) => {
    res.json({ message: 'Auth working', userId: req.userId });
});

userRouter.post('/test-upload', auth, upload.array('avatar'), (req, res) => {
    console.log('Test upload - User ID:', req.userId);
    console.log('Test upload - Files:', req.files);
    res.json({ 
        message: 'Test upload endpoint working', 
        userId: req.userId,
        filesReceived: req.files?.length || 0
    });
});

export default userRouter