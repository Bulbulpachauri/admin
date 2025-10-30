import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../../context/MyContext";
import { CircularProgress } from "@mui/material";
import { FaUpload } from "react-icons/fa";
import { fetchData, editData } from "../../utils/api";

const Profile = () => {
    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    
    const context = useContext(MyContext);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await fetchData('/api/user/user-details');
            if (response.data && response.data.success) {
                setUserDetails(response.data.data);
                if (response.data.data.avatar) {
                    const avatarUrl = response.data.data.avatar.secure_url || response.data.data.avatar;
                    setPreviews([avatarUrl]);
                }
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            context.alertBox("error", "Failed to fetch user details.");
        }
    };

    const onChangeFile = async (e) => {
        try {
            const files = e.target.files;
            if (files.length > 0) {
                setUploading(true);
                const formData = new FormData();
                formData.append('avatar', files[0]);
                
                const response = await editData("/api/user/user-avatar", formData);
                
                if (response.data && response.data.success) {
                    const avatarUrl = response.data.data.avatar.secure_url || response.data.data.avatar;
                    setPreviews([avatarUrl]);
                    context.alertBox("success", "Avatar updated successfully!");
                    fetchUserDetails(); // Refresh user details
                } else {
                    context.alertBox("error", "Failed to upload avatar.");
                }
            }
        } catch (error) {
            context.alertBox("error", "Upload failed.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white px-5 pb-5'>
                <h2 className="text-[18px] font-[600]">
                    Users Profile
                </h2>

                <br />

                <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group 
                        flex items-center justify-center bg-gray-200">

                    {
                        uploading === true ? <CircularProgress color="inherit" /> :
                            <>
                                {previews?.length > 0 ? (
                                    previews.map((img, index) => (
                                        <img
                                            src={img}
                                            key={index}
                                            className='w-full h-full object-cover'
                                            alt="Profile Avatar"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ))
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        <span>No Image</span>
                                    </div>
                                )}
                            </>
                    }

                    <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)]
                                         flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
                        <FaUpload className="text-[#fff] text-[25px]" />
                        <input 
                            type="file" 
                            className="absolute top-0 left-0 w-full h-full opacity-0" 
                            onChange={onChangeFile}
                            name="avatar"
                            accept="image/*"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;