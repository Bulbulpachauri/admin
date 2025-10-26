import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmailFun from "../config/sendEmail.js";
import { VerificationEmail } from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generatedAccessToken.js";
import generateRefreshToken from "../utils/generatedRefreshToken.js";

import fs from 'fs';

export async function registerUserController(request, response) {
    try {
        let user;
        const { name, email, password, phone } = request.body;
        if (!name || !email || !password || !phone) {
            return response.status(400).json({
                message: "provide email, name, password and phone number",
                error: true,
                success: false
            })
        }

        user = await UserModel.findOne({ email: email });
        if (user) {
            return response.status(400).json({
                message: "User already Registered with this email",
                error: true,
                success: false
            })
        }

        const verifyCode = Math.floor(100000 + Math.random() * 90000).toString();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new UserModel({
            name: name,
            email: email,
            password: hashedPassword,
            otp: verifyCode,
            otpExprise: Date.now() + 600000,
            phone: phone,
            avatar: {
                filename: "default-avatar.png",
                secure_url: "http://localhost:8000/uploads/default-avatar.png"
            }
        });

        await user.save();

        //Send verification email
        await sendEmailFun(
            email,
            "Verify Email from Ecommerce App",
            "",
            VerificationEmail(name, verifyCode)
        );

        // Create a JWT token for verification purposes
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JSON_WEB_TOKEN_SECRET_KEY,
        );

        return response.status(200).json({
            success: true,
            error: false,
            message: "User registered successfully! Please verify your email.",
            token: token,// Optional: include this if needed for verification
        });


        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function verifyEmailController(request, response) {
    try {
        const { email, otp } = request.body;

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return response.status(400).json({ error: true, success: false, message: "User not found" });
        }

        const isCodeValid = user.otp === otp;
        const isNotExpired = user.otpExprise > Date.now();

        if (isCodeValid && isNotExpired) {
            user.verify_email = true;
            user.otp = null;
            user.otpExprise = null;
            await user.save();
            return response.status(200).json({ error: false, success: true, message: "Email verified successfully" });
        } else if (!isCodeValid) {
            return response.status(400).json({ error: true, success: false, message: "Invalid OTP" });
        } else if (!isNotExpired) {
            return response.status(400).json({ error: true, success: false, message: "OTP expired" });
        }

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function loginUserController(request, response) {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({
                message: "Email and password are required",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return response.status(400).json({
                message: "User not registered",
                error: true,
                success: false
            });
        }

        if (user.status !== "active") {
            return response.status(400).json({
                message: "Contact admin",
                error: true,
                success: false
            });
        }

        if (user.verify_email !== true) {
            return response.status(400).json({
                message: "Your Email is not verify yet please verify your email first",
                error: true,
                success: false
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return response.status(400).json({
                message: "Invalid password",
                error: true,
                success: false
            });
        }

        const accesstoken = await generateAccessToken(user._id);
        const refreshtoken = await generateRefreshToken(user._id);

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        response.cookie("accessToken", accesstoken, cookiesOption);
        response.cookie("refreshToken", refreshtoken, cookiesOption);

        await UserModel.findByIdAndUpdate(user._id, {
            last_login_date: new Date(),
            access_token: accesstoken
        });

        return response.json({
            message: "Login successful",
            error: false,
            success: true,
            data: {
                accessToken: accesstoken,
                refreshToken: refreshtoken
            }
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


//logout controller
export async function logoutController(request, response) {
    try {
        const userid = request.userId; //auth middleware

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        response.clearCookie("accessToken", cookiesOption);
        response.clearCookie("refreshToken", cookiesOption);

        await UserModel.findByIdAndUpdate(userid, {
            refresh_token: ""
        });

        return response.json({
            message: "Logout successful",
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//image upload
export async function useAvatarController(request, response) {
    try {
        const userId = request.userId;
        const files = request.files;
        
        if (!files || files.length === 0) {
            return response.status(400).json({
                message: "No file uploaded",
                error: true,
                success: false
            });
        }

        const file = files[0];
        const avatarData = {
            filename: file.filename,
            secure_url: `http://localhost:8000/uploads/${file.filename}`
        };

        await UserModel.findByIdAndUpdate(userId, { avatar: avatarData });

        return response.status(200).json({
            message: "Avatar updated successfully",
            error: false,
            success: true,
            data: { avatar: avatarData.secure_url }
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    }
}

export async function removeImageFromCloudinary(request, response) {
    try {
        const imgUrl = request.query.img;
        if (!imgUrl) {
            return response.status(400).send("Image URL is required");
        }

        const urlArr = imgUrl.split("/");
        const filename = urlArr[urlArr.length - 1];
        const filePath = `uploads/${filename}`;

        if (filename && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            response.status(200).json({ message: "Image deleted successfully" });
        } else {
            response.status(400).send("Image file not found");
        }
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//update user details
export async function updateUserDetails(request, response) {
    try {
        const userId = request.userId; //auth middleware
        const { name, email, mobile, password } = request.body;

        const userExist = await UserModel.findById(userId);
        if (!userExist)
            return response.status(404).send('The user cannot be Updated!');

        let verifyCode = "";
        let needsEmailVerification = false;

        if (email && email !== userExist.email) {
            verifyCode = Math.floor(100000 + Math.random() * 90000).toString();
            needsEmailVerification = true;
        }

        let hashPassword = userExist.password;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashPassword = await bcrypt.hash(password, salt);
        }

        const updatedUserData = {
            name: name || userExist.name,
            mobile: mobile || userExist.mobile,
            email: email || userExist.email,
            password: hashPassword,
        };

        if (needsEmailVerification) {
            updatedUserData.verify_email = false;
            updatedUserData.otp = verifyCode;
            updatedUserData.otpExprise = Date.now() + 600000;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            updatedUserData,
            { new: true }
        );

        if (needsEmailVerification) {
            // Send verification email
            await sendEmailFun(
                updatedUser.email,
                "Verify email from Ecommerce App",
                "",
                VerificationEmail(updatedUser.name, verifyCode)
            )
        }

        return response.status(200).json({
            message: "User updated successfully",
            error: false,
            success: true,
            data: updatedUser
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//forgot password
export async function forgotPasswordController(request, response) {
    try {
        const { email } = request.body;

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        else{
        let verifyCode = Math.floor(100000 + Math.random() * 90000).toString();

        user.otp = verifyCode;
        user.otpExprise = Date.now() + 600000;

        await user.save();

        await sendEmailFun(
            email,
            "Verify OTP from Ecommerce app",
            "",
            VerificationEmail(user.name, verifyCode)
        )

        return response.json({
            message: "check your email",
            error: false,
            success: true
        })
        
        }


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


export async function verifyForgotPasswordOtp(request, response) {
    try {
        const {email,otp} = request.body;

    const user = await UserModel.findOne({email:email});

    console.log(user);

    if(!user){
        return response.status(400).json({
            message: "User not found",
            error: true,
            success: false
        })
    }

    if(!email || !otp){
        return response.status(400).json({
            message: "Provide required field email, otp.",
            error: true,
            success: false
        })
    }

    if(otp !== user.otp){
        return response.status(400).json({
            message: "Invalid OTP",
            error: true,
            success: false
        })
    }


    const currentTime = new Date().toISOString()

    if(user.otpExprise < Date.now()){
        return response.status(400).json({
            message: "Otp is expired",
            error: true,
            success: false
        })
    }


    user.otp = ""
    user.otpExprise = "";

    await user.save();

    return response.status(200).json({
        message: "Verify OTP successfully",
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

//reset password
export async function resetPassword(request, response) {
    try {
        const {email, newPassword, confirmPassword} = request.body;
        if(!email || !newPassword || !confirmPassword){
            return response.status(400).json({
                message: "Provide required fields email, newPassword, confirmPassword.",
            })
        }

        const user = await UserModel.findOne({email:email});
        if(!user){
            return response.status(400).json({
                message: "Email is not available",
                error: true,
                success: false
            })
        }

        if(newPassword !== confirmPassword){
            return response.status(400).json({
                message: "newPassword and confirmPassword must be same.",
                error: true,
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(confirmPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return response.json({
            message: "Password reset successfully",
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

//refresh token controler
export async function refreshToken(request, response) {
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]; ///Bearer token

        if (!refreshToken) {
            return response.status(400).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }


        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
        if(!verifyToken){
            return response.status(400).json({
                message: "token is expired",
                error: true,
                success: false
            })
        }

        const userId = verifyToken.id;
        const newAccessToken = await generateAccessToken(userId);

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.cookie("accessToken", newAccessToken, cookiesOption);

        return response.json({
            message: "New Access Token generated successfully",
            error: false,
            success: true,
            data:{
                accessToken:newAccessToken
            }
        })
        

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//get login user details
export async function userDetails(request, response) {
    try {
        const userId = request.userId

        const user = await UserModel.findById(userId).select('-password -refresh_token')
        if(!user){
            return response.status(400).json({
                message: "User not found",
                error: true,
                success: false
            })
        }

        return response.status(200).json({
            message: "User details",
            data: user,
            error: false,
            success: true
        })

    } catch (error){
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}