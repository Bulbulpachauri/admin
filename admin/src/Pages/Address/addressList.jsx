import React, { useState, useEffect, useContext } from 'react';
import { fetchData, deleteData } from '../../utils/api';
import { MyContext } from '../../context/MyContext';
import { Button } from '@mui/material';
import { MdDelete } from 'react-icons/md';

const AddressList = () => {
    const context = useContext(MyContext);
    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            setIsLoading(true);
            const response = await fetchData('/api/address/get');
            if (response && response.success) {
                setAddresses(response.data || []);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            context.alertBox("error", "Failed to fetch addresses");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (addressId) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                const response = await deleteData(`/api/address/delete/${addressId}`);
                if (response && response.data.success) {
                    context.alertBox("success", "Address deleted successfully");
                    fetchAddresses();
                } else {
                    context.alertBox("error", "Failed to delete address");
                }
            } catch (error) {
                console.error('Error deleting address:', error);
                context.alertBox("error", "Failed to delete address");
            }
        }
    };

    if (isLoading) {
        return <div className="p-5">Loading addresses...</div>;
    }

    return (
        <section className="p-5 bg-gray-50">
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Address List</h2>
                
                {addresses.length === 0 ? (
                    <p className="text-gray-500">No addresses found.</p>
                ) : (
                    <div className="grid gap-4">
                        {addresses.map((address, index) => (
                            <div key={address._id || index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div className="grid grid-cols-2 gap-4 flex-1">
                                        <div>
                                            <p><strong>Address:</strong> {address.address}</p>
                                            <p><strong>City:</strong> {address.city}</p>
                                            <p><strong>State:</strong> {address.state}</p>
                                        </div>
                                        <div>
                                            <p><strong>Pincode:</strong> {address.pincode}</p>
                                            <p><strong>Country:</strong> {address.country}</p>
                                            <p><strong>Mobile:</strong> {address.mobile}</p>
                                            <p><strong>Status:</strong> 
                                                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                                                    address.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {address.status ? 'Active' : 'Inactive'}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => handleDelete(address._id)}
                                        className="!min-w-[40px] !text-red-600 hover:!bg-red-50"
                                        title="Delete Address"
                                    >
                                        <MdDelete size={20} />
                                    </Button>
                                </div>
                            </div>
                        ))
                    </div>
                )}
            </div>
        </section>
    );
};

export default AddressList;