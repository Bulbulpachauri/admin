import React, { useContext } from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Button  from "@mui/material/Button";
import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { MyContext } from "../../App";

const ProductItem = () => {

  const context = useContext(MyContext);

  return (
    <div className="ProductItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]">
        <div className="group imgWrapper w-[100%] h-[220px] overflow-hidden rounded-md relative">
          <Link to="/">
          <div className="img h-[220px] overflow-hidden">
            <img src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg" 
            className="w-full"/>
            
            <img src="https://api.spicezgold.com/download/file_1734529297929_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-0-202307260626.jpg" 
            className="w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105"/>

            <img src="" 
            className="w-full"/>

            <img src="" 
            className="w-full"/>
            </div>
            </Link>
            <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-blue-500 text-white rounded-md p-2 text-[12px] font-[500]">10%</span>

            <div className="actions absolute top-[-200px] right-[15px] z-50 flex item-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
                <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white text-black hover:!bg-blue-500 hover:text-white group" onClick={()=>context.setOpenProductDetailsModal(true)}> 
                  <MdZoomOutMap className="text-[18px] !text-black group-hover:text-white hover:!text-white"/>
                  </Button>

                  <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white text-black hover:!bg-blue-500 hover:text-white group">
                  <IoGitCompareOutline className="text-[18px] !text-black group-hover:text-white hover:!text-white"/>
                  </Button>

                  <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white text-black hover:!bg-blue-500 hover:text-white group">
                  <FaRegHeart className="text-[18px] !text-black group-hover:text-white hover:!text-white"/>
                  </Button>
            </div>
        </div>

        <div className="info p-3 py-5">
            <h6 className="text-[13px]"><Link to="/" className="link transition-all">Soylent Green</Link></h6>
            <h3 className="text-[13px] tittle mt-1 font-[500] mb-1 text-[#000]">
                <Link to="/" className="link transition-all">
                Siril Georgette Pink Color Saree with blouse Piece
                </Link>
                </h3>

             <Rating name="size-small" defaultValue={4} size="small" readOnly />

             <div className="flex items-center gap-4">
                <span className="oldPrice line-through text-gray-500 text-[15px]nfont-[500]">$58.00</span>
                <span className="Price text-red-500 text-[15px] font-[600]">$58.00</span>
             </div>
        </div>
    </div>
  );
};


export default ProductItem;