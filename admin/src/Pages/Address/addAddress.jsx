import React, { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MyContext } from '../../context/MyContext';
import { editData, postData } from '../../utils/api';


const AddAddress = () => {
    const context = useContext(MyContext);
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formsFields, setformsFields] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token);
    }, []);

    const [status, setStatus] = useState('false');

    const [formFields, setFormFields] = useState({
        address_line1: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        mobile: '',
        status: 'false'
    });

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

     const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormFields(prev => ({
            ...prev,
            [name]: value
        }));
    };

           const handleSave = async (e) => {
               e.preventDefault();
               try {
                   setIsLoading(true);

                   const token = localStorage.getItem('accessToken');
                   if(!token) {
                       context.alertBox("error", "Please login first to add address.");
                       return;
                   }

                   if(formFields.address_line1 === ""){
                       context.alertBox("error", "Please enter Address Line 1.");
                       return;
                   }

                   if (formFields.city === ""){
                       context.alertBox("error", "Please enter Your city name.");
                       return;
                   }

                   if (formFields.state === ""){
                       context.alertBox("error", "Please enter Your state.");
                       return;
                   }

                   if (formFields.pincode === ""){
                       context.alertBox("error", "Please enter Your pincode.");
                       return;
                   }

                   if (formFields.country === ""){
                       context.alertBox("error", "Please enter Your country.");
                       return;
                   }

                   if (phone === ""){
                       context.alertBox("error", "Please enter Your 10-digit mobile number.");
                       return;
                   }

                   const addressData = {
                       ...formFields,
                       mobile: phone
                   };

                   const response = await postData('/api/address/add', addressData);
                   
                   if (response && response.success) {
                       context.alertBox("success", "Address added successfully!");
                       setFormFields({
                           address_line1: '',
                           city: '',
                           state: '',
                           pincode: '',
                           country: '',
                           mobile: '',
                           status: 'false'
                       });
                       setPhone('');
                       setStatus('false');
                   } else {
                       context.alertBox("error", response?.message || "Failed to add address");
                   }
               } catch (error) {
                   context.alertBox("error", "Failed to save address");
               } finally {
                   setIsLoading(false);
               }
           };

    return (
        <section className="p-5 bg-gray-50">
            <form className="form py-3 p-8" onSubmit={handleSave}>
                <div className="scroll mx-h-[72vh] overflow-y-scroll pr-4 pt-4">
                    <div className="grid grid-cols-2 text-black mb-3 gap-4">
                        <div className="col w-[100%]">
                            <h3 className="text-[14px] font-[500] mb-1"> Address Line 1</h3>
                            <input 
                                type="text" 
                                name="address_line1"
                                value={formFields.address_line1}
                                onChange={handleFormChange}
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none 
                                focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white"
                            />
                        </div>

                        <div className="col w-[100%]">
                            <h3 className="text-[14px] font-[500] mb-1"> City </h3>
                            <input 
                                type="text" 
                                name="city"
                                value={formFields.city}
                                onChange={handleFormChange}
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 text-black mb-3 gap-4">
                        <div className="col w-[100%]">
                            <h3 className="text-[14px] font-[500] mb-1"> State </h3>
                            <input 
                                type="text" 
                                name="state"
                                value={formFields.state}
                                onChange={handleFormChange}
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white" 
                            />
                        </div>

                        <div className="col w-[100%]">
                            <h3 className="text-[14px] font-[500] mb-1"> Pincode </h3>
                            <input 
                                type="text" 
                                name="pincode"
                                value={formFields.pincode}
                                onChange={handleFormChange}
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white" 
                            />
                        </div>

                        <div className="col w-[100%]">
                            <h3 className="text-[14px] font-[500] mb-1"> Country </h3>
                            <input 
                                type="text" 
                                name="country"
                                value={formFields.country}
                                onChange={handleFormChange}
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white" 
                            />
                        </div>

                        <div className="col w-[100%]">
                            <h3 className="text-[14px] font-[500] mb-1"> Mobile No </h3>
                            <PhoneInput
                                defaultCountry="in"
                                value={phone}
                                disabled={isLoading}
                                onChange={(phone) => {
                                    setPhone(phone);
                                    setFormFields(prev => ({
                                        ...prev,
                                        mobile: phone
                                    }))
                                }}
                            />
                        </div>

                        <div className="col w-[100%]">
                            <h3 className='text-[14px] font-[500] mb-1 text-black'> Status </h3>
                            <Select
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                    setFormFields(prev => ({
                                        ...prev,
                                        status: e.target.value
                                    }))
                                }}
                                className="w-full h-[40px] bg-white"
                            >
                                <MenuItem value="false">False</MenuItem>
                                <MenuItem value="true">True</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button 
                            type="submit" 
                            variant="contained" 
                            disabled={isLoading}
                            className="!bg-blue-600 !text-white !px-8 !py-2"
                        >
                            {isLoading ? 'Saving...' : 'Publish and View'}
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default AddAddress;