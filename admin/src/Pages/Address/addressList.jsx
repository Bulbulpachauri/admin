import React, { useState, useEffect, useContext } from 'react';
import { getData } from '../../utils/api';
import { MyContext } from '../../context/MyContext';

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
            const response = await getData('/api/address');
            if (response && response.success) {
                setAddresses(response.addresses || []);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            context.alertBox("error", "Failed to fetch addresses");
        } finally {
            setIsLoading(false);
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p><strong>Address:</strong> {address.address_line1}</p>
                                        <p><strong>City:</strong> {address.city}</p>
                                        <p><strong>State:</strong> {address.state}</p>
                                    </div>
                                    <div>
                                        <p><strong>Pincode:</strong> {address.pincode}</p>
                                        <p><strong>Country:</strong> {address.country}</p>
                                        <p><strong>Mobile:</strong> {address.mobile}</p>
                                        <p><strong>Status:</strong> 
                                            <span className={`ml-2 px-2 py-1 rounded text-sm ${
                                                address.status === 'true' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {address.status === 'true' ? 'Active' : 'Inactive'}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AddressList;