import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";

const MyListItems = (props) => {


    const handleClickQty = (event) => {
        setQtyAnchorEl(event.currentTarget);
    };
    const handleCloseQty = (value) => {
        setQtyAnchorEl(null);
        if (value !== null) {
            setselectedQty(value);
        }
    };

    return (
        <div className="cartItem w-full p-3 flex item-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
            <div className="img w-[15%] rounded-md overflow-hidden">
                <Link to="/product/7845" className="group">
                    <img src="https://api.spicezgold.com/download/file_1734527564399_fytona-medium-laptop-backpack-light-weight-for-school-collage-office-tuition-and-picnic-waterproof-backpack-grey-25-l-product-images-rvyoumccae-0-202402141853.jpg" className="w-full group-hover:scale-100 transition-all" />
                </Link>
            </div>


            <div className="info w-[85%] relative">
                <IoCloseSharp className="cursor-pointer absolute top-[0px] right-[0px]  text-
                      [22px] link transition-all" />
                <span className="text-[13px]">Sangria</span>
                <h3 className="text-[15px]">
                    <Link className="link">
                        A-Line Kurti With Sharara & Duoatta
                    </Link>
                </h3>

                <Rating name="size-small" defaultValue={4} size="small" readOnly />


                <div className="flex items-center gap-4 mt-2">
                    <span className="Price text-[14px] font-[600]">
                        $58.00
                    </span>

                    <span className="oldPrice line-through text-gray-500 text-[15px]nfont-[500]"
                    >$58.00
                    </span>
                    <span className="Price text-red-500 text-[15px] font-[600]">
                        55% OFF
                    </span>
                </div>


                <br/>

                <Button className="btn-org btn-sm">Add to Cart</Button>
                
            </div>       
             </div>
    );
};

export default MyListItems;
