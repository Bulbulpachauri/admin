import UserModel from "./models/user.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        // Check if admin already exists
        const existingAdmin = await UserModel.findOne({ email: "admin@admin.com" });
        if (existingAdmin) {
            console.log("Admin user already exists");
            process.exit(0);
        }

        // Create admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin123", salt);

        const adminUser = new UserModel({
            name: "Admin User",
            email: "admin@admin.com",
            password: hashedPassword,
            phone: "1234567890",
            verify_email: true,
            status: "active",
            role: "admin",
            avatar: {
                filename: "default-avatar.png",
                secure_url: "http://localhost:8000/uploads/default-avatar.png"
            }
        });

        await adminUser.save();
        console.log("Admin user created successfully!");
        console.log("Email: admin@admin.com");
        console.log("Password: admin123");
        
        process.exit(0);
    } catch (error) {
        console.error("Error creating admin user:", error);
        process.exit(1);
    }
};

createAdminUser();