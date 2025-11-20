import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { fetchData, editData, postData } from '../../utils/api';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const MyAccount = () => {
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [phone, setPhone] = useState('');
    const [changePassword, setChangePassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [addressForm, setAddressForm] = useState({
        address_line1: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        mobile: '',
        status: true
    });
    const [addressLoading, setAddressLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null) {
            history("/login");
        } else {
            fetchUserDetails();
            fetchAddresses();
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

    const fetchAddresses = async () => {
        try {
            console.log('Fetching addresses...');
            console.log('Token:', localStorage.getItem('token'));
            const response = await fetchData('/api/address/get');
            console.log('Full response object:', response);
            console.log('Response status:', response?.status);
            console.log('Response data:', response?.data);
            
            if (response?.data && response.data.success) {
                console.log('address data:', response.data.data);
                console.log('Number of addresses:', response.data.data.length);
                setAddresses(response.data.data);
                // Set the active address as selected
                const activeAddress = response.data.data.find(addr => addr.status === true);
                if (activeAddress) {
                    setSelectedAddress(activeAddress._id);
                }
            } else {
                console.log('No addresses found or request failed');
                console.log('Response success:', response?.data?.success);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            console.error('Error details:', error.response?.data);
        }
    };

    const handleAddressChange = (e) => {
        setAddressForm({
            ...addressForm,
            [e.target.name]: e.target.value
        });
    };

    const handleAddAddress = async () => {
        setAddressLoading(true);
        try {
            const response = await postData('/api/address/add', addressForm);
            if (response && response.success) {
                context.alertBox("success", "Address added successfully!");
                setAddressForm({
                    address_line1: '',
                    city: '',
                    state: '',
                    pincode: '',
                    country: '',
                    mobile: '',
                    status: true
                });
                setShowAddAddress(false);
                fetchAddresses();
            }
        } catch (error) {
            context.alertBox("error", error?.message || "Failed to add address");
        }
        setAddressLoading(false);
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

    const handleAddressSelection = async (addressId) => {
        try {
            const response = await editData('/api/address/update', { addressId });
            if (response.data && response.data.success) {
                setSelectedAddress(addressId);
                context.alertBox("success", "Address selected successfully!");
                fetchAddresses(); // Refresh addresses to update status
            }
        } catch (error) {
            context.alertBox("error", "Failed to select address");
        }
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
                                   <PhoneInput
                                        defaultCountry="in"
                                        value={userDetails.phone || ''}
                                        disabled={loading}
                                        onChange={(phoneValue) => {
                                        setUserDetails(prev => ({
                                            ...prev,
                                            phone: phoneValue
                                        }));
                                    }}
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

                    <div className="card bg-white p-5 shadow-md rounded-md mt-5">
                        <div className="flex items-center pb-3">
                            <h2 className="pb-0">My Address</h2>
                            <Button className="!ml-2" onClick={fetchAddresses}>Refresh</Button>
                            <Button className="!ml-auto" onClick={() => setShowAddAddress(!showAddAddress)}>Add Address</Button>
                        </div>
                        <hr />

                        {showAddAddress && (
                            <form className="mt-8">
                                <div className="flex items-center gap-5 mb-4">
                                    <div className="w-[100%]">
                                        <TextField
                                            label="Address Line 1"
                                            variant="outlined"
                                            size="small"
                                            className="w-full"
                                            name="address_line1"
                                            value={addressForm.address_line1}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-5 mb-4">
                                    <div className="w-[50%]">
                                        <TextField
                                            label="City"
                                            variant="outlined"
                                            size="small"
                                            className="w-full"
                                            name="city"
                                            value={addressForm.city}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                    <div className="w-[50%]">
                                        <TextField
                                            label="State"
                                            variant="outlined"
                                            size="small"
                                            className="w-full"
                                            name="state"
                                            value={addressForm.state}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-5 mb-4">
                                    <div className="w-[50%]">
                                        <TextField
                                            label="Pincode"
                                            variant="outlined"
                                            size="small"
                                            className="w-full"
                                            name="pincode"
                                            value={addressForm.pincode}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                    <div className="w-[50%]">
                                        <TextField
                                            label="Country"
                                            variant="outlined"
                                            size="small"
                                            className="w-full"
                                            name="country"
                                            value={addressForm.country}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-5 mb-4">
                                    <div className="w-[50%]">
                                        <TextField
                                            label="Mobile Number"
                                            variant="outlined"
                                            size="small"
                                            className="w-full"
                                            name="mobile"
                                            value={addressForm.mobile}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        className="btn-org btn-sm w-[150px]"
                                        onClick={handleAddAddress}
                                        disabled={addressLoading}
                                    >
                                        {addressLoading ? 'Adding...' : 'Add Address'}
                                    </Button>
                                    <Button
                                        className="btn-sm w-[100px]"
                                        onClick={() => setShowAddAddress(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        )}

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4">Saved address</h3>
                            {addresses.length > 0 ? (
                                <>
                                    {addresses.find(addr => addr.status) && (
                                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <p className="text-sm font-medium text-green-800 mb-1">Currently Selected Address:</p>
                                            <p className="text-green-700">
                                                {addresses.find(addr => addr.status)?.address}, {addresses.find(addr => addr.status)?.city}, {addresses.find(addr => addr.status)?.state} - {addresses.find(addr => addr.status)?.pincode}
                                            </p>
                                        </div>
                                    )}
                                    <div className="space-y-4">
                                        {addresses.map((address, index) => (
                                            <div key={address._id} className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                                address.status ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                                            }`}>
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        type="radio"
                                                        name="selectedAddress"
                                                        checked={address.status}
                                                        onChange={() => handleAddressSelection(address._id)}
                                                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-800">{address.address}</p>
                                                        <p className="text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
                                                        <p className="text-gray-600">{address.country}</p>
                                                        <p className="text-gray-600">Mobile: {address.mobile}</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                                            address.status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                            {address.status ? 'Selected' : 'Available'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p>No addresses found. Click "Add Address" to add your first address.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyAccount;