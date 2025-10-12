import React, { useState } from "react";
import Button from "@mui/material/Button";

import Rating from '@mui/material/Rating';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

export const ProductDetailsComponent = () => {
    const [productActionIndex, setProductActionIndex] = useState(null);
    const navigate = useNavigate();
  return (
        <>
        <h1 className="text-[24px] font-[600] mb-2">
                      Siril Poly Slik White & Beige Color Saree With Piece | saree for Women saree| sarees</h1>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-[13px]">
                        Brands :{" "}
                        <span className="font-[500] text-black opacity-75">
                          House of Chikankari</span>
                      </span>
        
                      <Rating name="size-small" defaultValue={4} size="small" readOnly />
                      <span className="text-[13px] cursor-pointer">Review (5)</span>
                    </div>
        
                    <div className="flex items-center gap-4 mt-4">
                      <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">$58.00</span>
                      <span className="Price text-red-500 text-[20px] font-[600]">$58.00</span>
        
                      <span className="text-[14px]">Available In Stock: <span className="text-green-500 
                      text-[14px] font-bold">147 Items</span></span>
        
                    </div>
        
                    <br />
        
                    <p className="mt-4 pr-10 mb-5" >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt laborum voluptatum,
                      similique illo assumenda deleniti, totam veritatis, sit consectetur quo libero. Expedita commodi iure consectetur dolores, necessitatibus consequuntur
                      quia quae delectus, facilis atque porro pariatur! Aut placeat assumenda, iusto minima sint tempora inventore deserunt sapiente beatae mollitia illo pariatur repudiandae?</p>
        
                    <div className="flex items-center gap-3 ">
                      <span className="text-[16px]">Size:</span>
                      <div className="flex items-center gap-1 actions">
                        <Button className={`${productActionIndex === 0 ? '!bg-red-500 !text-white' : ''}`} onClick={() => setProductActionIndex(0)}>S</Button>
                        <Button className={`${productActionIndex === 1 ? '!bg-red-500 !text-white' : ''}`} onClick={() => setProductActionIndex(1)}>M</Button>
                        <Button className={`${productActionIndex === 2 ? '!bg-red-500 !text-white' : ''}`} onClick={() => setProductActionIndex(2)}>L</Button>
                        <Button className={`${productActionIndex === 3 ? '!bg-red-500 !text-white' : ''}`} onClick={() => setProductActionIndex(3)}>XL</Button>
                      </div>
                    </div>
        
                    <p className="text-[14px] mt-5 mb-2 text-[#000]">Free Shipping (Est. Delivery Time 2-3 Days)</p>
        
                    <div className="flex item-cente gap-4 py-4">

        
                      <Button className="btn-org flex gap-2">
                        <MdOutlineAddShoppingCart className="text-[22px]" />Add to Cart</Button>
                      <Button className="btn-org flex gap-2" onClick={() => navigate('/verify')}>
                        Verify OTP
                      </Button>
                    </div>
        
                    <div className="flex items-center gap-6 mt-4">
                      <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
                        <FaRegHeart className="text-[17px]" /> Add to Wishlist</span>
        
                      <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
                        <IoGitCompareOutline className="text-[18px]" /> Add to Compare</span>
                       </div>
                    </>
  )
}