import React from 'react'
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from 'react-router';

const AccountSidebar = () => {
    return (
        <div className="card bg-white shadow-md rounded-md sticky top-[10px] ">
            <div className="w-full p-5 flex items-center jutify-center flex-col">
                <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group">
                    <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_instagramfeeds/views/img/instapic/8.jpg" />

                    <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)]
                                 flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
                        <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
                        <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0 " />
                    </div>

                </div>

                <h3>Bulbul Pachauri</h3>
                <h6 className="text-[13px] font-[500]">bulbulpachauri21@gmail.com</h6>

            </div>


            <ul className="list-none pb-5 bg-[(#f1f1f1)] myAccountTabs">
                <li className="w-full">
                    <NavLink to="/my-account" exact={true} activeclassName="isActive">
                        <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.7)]
                             !rounded-none flex items-center gap-2"><FaRegUser className="text-[17px]" />My Profile
                        </Button>
                    </NavLink>
                </li>
            </ul>

            <ul className="list-none pb-5">
                <li className="w-full">
                    <NavLink to="/my-list" exact={true} activeclassName="isActive">
                        <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.7)]
                             !rounded-none flex items-center gap-2"><IoBagCheckOutline className="text-[17px]" />My List
                        </Button>
                    </NavLink>
                </li>
            </ul>

            <ul className="list-none pb-5">
                <li className="w-full">
                    <NavLink to="/my-orders" exact={true} activeclassName="isActive">
                        <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.7)]
                             !rounded-none flex items-center gap-2">< IoIosHeartEmpty className="text-[17px]" />My Orders
                        </Button>
                    </NavLink>
                </li>
            </ul>

            <ul className="list-none pb-5">
                <li className="w-full">
                    <NavLink to="/my-logout" exact={true} activeclassName="isActive">
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