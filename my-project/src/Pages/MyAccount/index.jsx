import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { fetchData, editData } from '../../utils/api';

const MyAccount = () => {
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [changePassword, setChangePassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null) {
            history("/login");
        } else {
            fetchUserDetails();
        }
    }, [context?.isLogin]);

    const fetchUserDetails = async () => {
        try {
            const response = await fetchData('/api/user/user-details');
            if (response.data && response.data.success) {
                setUserDetails(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleInputChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordChange = (e) => {
        setChangePassword({
            ...changePassword,
            [e.target.name]: e.target.value
        });
    };

    const handleChangePassword = async () => {
        if (changePassword.newPassword !== changePassword.confirmPassword) {
            context.alertBox("error", "New passwords don't match");
            return;
        }
        setIsLoading2(true);
        try {
            const response = await editData('/api/user/change-password', {
                oldPassword: changePassword.oldPassword,
                newPassword: changePassword.newPassword
            });
            if (response.data && response.data.success) {
                context.alertBox("success", "Password changed successfully!");
                setChangePassword({ oldPassword: '', newPassword: '', confirmPassword: '' });
            }
        } catch (error) {
            context.alertBox("error", "Failed to change password");
        }
        setIsLoading2(false);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await editData(`/api/user/${userDetails._id}`, userDetails);
            if (response.data && response.data.success) {
                context.alertBox("success", "Profile updated successfully!");
            }
        } catch (error) {
            context.alertBox("error", "Failed to update profile");
        }
        setLoading(false);
    };

    return (
        <section className="py-10 w-full">
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSidebar />
                </div>

                <div className="col2 w-[50%]">
                    <div className="card bg-white p-5 shadow-md rounded-md mb-5">
                        <div className="flex items-center pb-3">
                            <h2 className="pb-0">My Profile </h2>
                            <Button className="!ml-auto" onClick={() => setShowChangePassword(!showChangePassword)}>Change Password</Button>
                        </div>
                        <hr />

                        <form className="mt-8">
                            <div className="flex items-center gap-5">
                                <div className="w-[50%]">
                                    <TextField
                                        label="Full Name"
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                        name="name"
                                        value={userDetails.name}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="w-[50%]">
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                        name="email"
                                        value={userDetails.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center mt-4 gap-5">
                                <div className="w-[50%]">
                                    <TextField
                                        label="Phone Number"
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                        name="phone"
                                        value={userDetails.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <br />

                            <div className="flex items-center gap-4">
                                <Button
                                    className="btn-org btn-sm w-[150px]"
                                    onClick={handleSave}
                                    disabled={loading}
                                >
                                    {loading ? 'Updating...' : 'Update Profile'}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {showChangePassword && (
                    <div className="card bg-white p-5 shadow-md rounded-md">
                        <div className="flex items-center pb-3">
                            <h2 className="pb-0">Change Password </h2>
                        </div>
                        <hr />

                        <form className="mt-8">
                            <div className="flex items-center gap-5">
                                <div className="w-[50%]">
                                    <TextField
                                        label="Old Password"
                                        type="password"
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                        name="oldPassword"
                                        value={changePassword.oldPassword}
                                        disabled={isLoading2}
                                        onChange={handlePasswordChange}
                                    />
                                </div>

                                <div className="w-[50%]">
                                    <TextField
                                        label="New Password"
                                        type="password"
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                        name="newPassword"
                                        value={changePassword.newPassword}
                                        disabled={isLoading2}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center mt-4 gap-5">
                                <div className="w-[50%]">
                                    <TextField
                                        label="Confirm Password"
                                        type="password"
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                        name="confirmPassword"
                                        value={changePassword.confirmPassword}
                                        disabled={isLoading2}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>

                            <br />

                            <div className="flex items-center gap-4">
                                <Button
                                    className="btn-org btn-sm w-[150px]"
                                    onClick={handleChangePassword}
                                    disabled={isLoading2}
                                >
                                    {isLoading2 ? 'Changing...' : 'Change Password'}
                                </Button>
                            </div>
                        </form>
                    </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MyAccount;