import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { fetchData, editData, postData, deleteData } from '../../utils/api';
import { MdDelete, MdEdit } from 'react-icons/md';

const Address = () => {
    const [address, setAddresses] = useState([]);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [addressForm, setAddressForm] = useState({
        address_line1: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        mobile: '',
        status: false
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
            fetchAddresses();
        }
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await fetchData('/api/address/get');
            if (response?.data && response.data.success) {
                setAddresses(response.data.data);
                const activeAddress = response.data.data.find(addr => addr.status === true);
                if (activeAddress) {
                    setSelectedAddress(activeAddress._id);
                }
            }
        } catch (error) {
            console.error('Error fetching address:', error);
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
                resetForm();
                fetchAddresses();
            }
        } catch (error) {
            context.alertBox("error", error?.message || "Failed to add address");
        }
        setAddressLoading(false);
    };

    const handleEditAddress = async () => {
        setAddressLoading(true);
        try {
            const response = await editData(`/api/address/edit/${editingAddress}`, addressForm);
            if (response?.data && response.data.success) {
                context.alertBox("success", "Address updated successfully!");
                resetForm();
                fetchAddresses();
            }
        } catch (error) {
            context.alertBox("error", error?.message || "Failed to update address");
        }
        setAddressLoading(false);
    };

    const handleDeleteAddress = async (addressId) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                const response = await deleteData(`/api/address/delete/${addressId}`);
                if (response?.data && response.data.success) {
                    context.alertBox("success", "Address deleted successfully!");
                    fetchAddresses();
                }
            } catch (error) {
                context.alertBox("error", "Failed to delete address");
            }
        }
    };

    const handleAddressSelection = async (addressId) => {
        try {
            const response = await editData('/api/address/update', { addressId });
            if (response.data && response.data.success) {
                setSelectedAddress(addressId);
                context.alertBox("success", "Address selected successfully!");
                fetchAddresses();
            }
        } catch (error) {
            context.alertBox("error", "Failed to select address");
        }
    };

    const startEdit = (address) => {
        setEditingAddress(address._id);
        setAddressForm({
            address_line1: address.address || '',
            city: address.city || '',
            state: address.state || '',
            pincode: address.pincode || '',
            country: address.country || '',
            mobile: address.mobile || '',
            status: address.status || false
        });
        setShowAddAddress(true);
    };

    const resetForm = () => {
        setAddressForm({
            address_line1: '',
            city: '',
            state: '',
            pincode: '',
            country: '',
            mobile: '',
            status: false
        });
        setShowAddAddress(false);
        setEditingAddress(null);
    };

    return (
        <section className="py-10 w-full">
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSidebar />
                </div>

                <div className="col2 w-[80%]">
                    <div className="card bg-white p-5 shadow-md rounded-md">
                        <div className="flex items-center pb-3">
                            <h2 className="pb-0">Address</h2>
                            <Button className="!ml-auto" onClick={() => setShowAddAddress(!showAddAddress)}>
                                {showAddAddress ? 'Cancel' : 'Add New Address'}
                            </Button>
                        </div>
                        <hr />

                        {showAddAddress && (
                            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">
                                    {editingAddress ? 'Edit Address' : 'Add New Address'}
                                </h3>
                                <form>
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
                                                required
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
                                                required
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
                                                required
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
                                                required
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
                                                required
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
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button
                                            className="btn-org btn-sm w-[150px]"
                                            onClick={editingAddress ? handleEditAddress : handleAddAddress}
                                            disabled={addressLoading}
                                        >
                                            {addressLoading ? 'Saving...' : (editingAddress ? 'Update Address' : 'Add Address')}
                                        </Button>
                                        <Button
                                            className="btn-sm w-[100px]"
                                            onClick={resetForm}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="mt-6">
                            {address.length > 0 ? (
                                <>
                                    {address.find(addr => addr.status) && (
                                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                            <p className="text-sm font-medium text-green-800 mb-2">Default Address:</p>
                                            <p className="text-green-700 font-medium">
                                                {address.find(addr => addr.status)?.address || address.find(addr => addr.status)?.address_line1}, {address.find(addr => addr.status)?.city}, {address.find(addr => addr.status)?.state} - {address.find(addr => addr.status)?.pincode}
                                            </p>
                                            <p className="text-green-600 text-sm mt-1">
                                                Mobile: {address.find(addr => addr.status)?.mobile}
                                            </p>
                                        </div>
                                    )}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold mb-4">All Address ({address.length})</h3>
                                        {address.map((address, index) => (
                                            <div key={address._id} className={`border rounded-lg p-4 transition-colors ${
                                                address.status ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
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
                                                        <p className="font-medium text-gray-800 mb-1">
                                                            {address.address || address.address_line1}
                                                        </p>
                                                        <p className="text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
                                                        <p className="text-gray-600">{address.country}</p>
                                                        <p className="text-gray-600 text-sm">Mobile: {address.mobile}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            address.status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                            {address.status ? 'Default' : 'Available'}
                                                        </span>
                                                        <Button
                                                            size="small"
                                                            onClick={() => startEdit(address)}
                                                            className="!min-w-[40px] !w-[40px] !h-[40px] !p-0"
                                                        >
                                                            <MdEdit className="text-blue-600" />
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            onClick={() => handleDeleteAddress(address._id)}
                                                            className="!min-w-[40px] !w-[40px] !h-[40px] !p-0"
                                                        >
                                                            <MdDelete className="text-red-600" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <div className="mb-4">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No address found</h3>
                                    <p className="text-gray-500 mb-4">Add your first address to get started with deliveries.</p>
                                    <Button
                                        className="btn-org"
                                        onClick={() => setShowAddAddress(true)}
                                    >
                                        Add Your First Address
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Address;