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
    const [loading, setLoading] = useState(false);

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
                    <div className="card bg-white p-5 shadow-md rounded-md">
                        <h2 className="pb-3">My Profile </h2>
                        <hr />

                        <form className="mt-5">
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

                            <br/>

                            <div className="flex items-center gap-4">
                                <Button 
                                    className="btn-org btn-lg w-[100px]" 
                                    onClick={handleSave}
                                    disabled={loading}
                                >
                                    {loading ? 'Updating...' : 'Update'}
                                </Button>
                                <Button 
                                    className="btn-org btn-border btn-lg w-[100px]"
                                    onClick={fetchUserDetails}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default MyAccount;
