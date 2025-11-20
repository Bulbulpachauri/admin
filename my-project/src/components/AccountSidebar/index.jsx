import React, { useState, useContext, useEffect } from 'react'
import { Button, CircularProgress } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { MyContext } from '../../App';
import { editData, fetchData } from '../../utils/api';
import { LuMapPinCheck } from "react-icons/lu";
import { MdOutlineManageAccounts } from "react-icons/md";   

const AccountSidebar = () => {

    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    const context = useContext(MyContext)

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await fetchData('/api/user/user-details');
            if (response.data && response.data.success) {
                setUserDetails(response.data.data);
                if (response.data.data.avatar && response.data.data.avatar.secure_url) {
                    setPreviews([response.data.data.avatar.secure_url]);
                }
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    let selectedImages = [];

    const onChangeFile = async(e, apiEndpoint) => {
        try {
            setPreviews([]);
            const files = e.target.files;
            setUploading(true);
            
            const formData = new FormData();

            for (var i = 0; i < files.length; i++) {
                if (files[i] &&(files[i].type === "image/jpeg" || files[i].type === "image/jpg" ||
                        files[i].type === "image/png" ||
                        files[i].type === "image/webp")
                ) {

                    const file = files[i];

                    selectedImages.push(file);
                    formData.append(`avatar`, file);


                } else {
                    context.alertBox("error", "Please select a valid JPG, PNG or webp image file.");
                    setUploading(false);
                    return false;
                }
            }


            
            editData("/api/user/user-avatar", formData).then((res) => {
                setUploading(false);

                if (res.data && res.data.success) {
                    let avatar = [];
                    avatar.push(res.data.data.avatar);
                    setPreviews(avatar);
                    context.alertBox("success", "Avatar updated successfully!");
                } else {

                    context.alertBox("error", res.data?.message || "Failed to upload avatar.");
                }
            }).catch((error) => {
                setUploading(false);

                
                if (error.response?.status === 401) {
                    context.alertBox("error", "Please login again. Your session has expired.");
                } else if (error.response?.status === 500) {
                    context.alertBox("error", "Server error. Please try again later.");
                } else {
                    const errorMsg = error.response?.data?.message || "Failed to upload avatar. Please try again.";
                    context.alertBox("error", errorMsg);
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="card bg-white shadow-md rounded-md sticky top-[10px] ">
            <div className="w-full p-5 flex items-center jutify-center flex-col">
                <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group 
                flex items-center justify-center bg-gray-200">

                    {
                        uploading === true ? <CircularProgress color="inherit" /> :
                        <>
                        {
                            previews?.length!==0 && previews?.map((img, index) => {

                                return (
                                <img 
                                src={img}
                                key={index}
                                className='w-full h-full object-cover'
                                />
                            )
                            })  
                        }
                        </>
                            
                    }


                    <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)]
                                 flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
                        <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
                        <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0 "  onChange={(e) =>
                            onChangeFile(e, "/api/user/user-avatar")
                        }
                            name="avatar"
                        />
                    </div>

                </div>

                <h3>{userDetails?.name || 'User'}</h3>
                <h6 className="text-[13px] font-[500]">{userDetails?.email || 'user@example.com'}</h6>

            </div>


            <ul className="list-none pb-5 bg-[(#f1f1f1)] myAccountTabs">
                <li className="w-full">
                    <NavLink to="/my-account" className={({ isActive }) => isActive ? "isActive" : ""}>
                        <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.7)]
                             !rounded-none flex items-center gap-2"><FaRegUser className="text-[15px]" />My Profile
                        </Button>
                    </NavLink>
                </li>

                 <li className="w-full">
                    <NavLink to="/address" className={({ isActive }) => isActive ? "isActive" : ""}>
                        <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.7)]
                             !rounded-none flex items-center gap-2"><LuMapPinCheck className="text-[18px]" />Address
                        </Button>
                    </NavLink>
                </li>
            </ul>

            <ul className="list-none pb-5">
                <li className="w-full">
                    <NavLink to="/my-list" className={({ isActive }) => isActive ? "isActive" : ""}>
                        <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.7)]
                             !rounded-none flex items-center gap-2"><IoBagCheckOutline className="text-[17px]" />My List
                        </Button>
                    </NavLink>
                </li>
            </ul>

            <ul className="list-none pb-5">
                <li className="w-full">
                    <NavLink to="/my-orders" className={({ isActive }) => isActive ? "isActive" : ""}>
                        <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.7)]
                             !rounded-none flex items-center gap-2"><IoIosHeartEmpty className="text-[17px]" />My Orders
                        </Button>
                    </NavLink>
                </li>
            </ul>

            <ul className="list-none pb-5">
                <li className="w-full">
                    <NavLink to="/my-logout" className={({ isActive }) => isActive ? "isActive" : ""}>
                        <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.7)] 
                            !rounded-none flex items-center gap-2"><IoIosLogOut className="text-[17px]" />Logout
                        </Button>
                    </NavLink>
                </li>
            </ul>

        </div>

    );
};


export default AccountSidebar;