import Button from "@mui/material/Button";
import React, { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./CategoryPanel";

import "../Navigation/style.css"

const Navigation = () => {

  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  }

  return (
    <>
      <nav >
        <div className='container flex items-center justify-end gap-8'>
          <div className='col_1 w-[20%] '>
            <Button className="!text-black gap-2 w-full" onClick={openCategoryPanel}>
              <RiMenu2Fill className="text-[18px]" />
              Shop By Categories
              <LiaAngleDownSolid className="text-[13px] ml-auto font-bold" />
            </Button>
          </div>

          <div className="col_2 w-[60%]">
            <ul className="flex items-center gap-3 nav">
              <li className="list-none">
                <Link to="/home" className="link transition text-[14px] font-[500] block" >
                  Home
                </Link>
              </li>
              <li className="list-none relative">
                <Link to="/category/fashion" className="link transition text-[14px] font-[500] block" >
                  Fashion
                </Link>

                <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                  <ul>
                    <li className="list-none w-full relative">
                      <Link to="/category/men" className="w-full block p-2 text-left">
                        Men
                      </Link>
                        <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                          <ul>
                            <li className="list-none w-full">
                              <Link to="/category/t-shirt" className="w-full block p-2">T-Shirt</Link>
                            </li>
                            <li className="list-none w-full">
                              <Link to="/category/jeans" className="w-full block p-2">Jeans</Link>
                            </li>
                            <li className="list-none w-full">
                              <Link to="/category/footwear" className="w-full block p-2">Footwear</Link>
                            </li>
                            <li className="list-none w-full">
                              <Link to="/category/watch" className="w-full block p-2">Watch</Link>
                            </li>
                          </ul>
                        </div>
                    </li>
                    <li className="list-none w-full">
                      <Link to="/category/women" className="w-full block p-2">Women</Link>
                    </li>
                    <li className="list-none w-full">
                      <Link to="/category/kids" className="w-full block p-2">Kids</Link>
                    </li>
                    <li className="list-none w-full">
                      <Link to="/category/girls" className="w-full block p-2">Girls</Link>
                    </li>
                    <li className="list-none w-full">
                      <Link to="/category/boys" className="w-full block p-2">Boys</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="list-none">
                <Link to="/category/electronics" className="link transition text-[14px] font-[500] block py-4" >Electronics</Link>
              </li>
              
              <li className="list-none">
                <Link to="/category/bag" className="link transition text-[14px] font-[500] block py-4" >Bag</Link>
              </li>

              <li className="list-none">
                <Link to="/category/footwear" className="link transition text-[14px] font-[500] block py-4" >Footwear</Link>
              </li>

              <li className="list-none">
                <Link to="/category/groceries" className="link transition text-[14px] font-[500] block py-4" >Groceries</Link>
              </li>

              <li className="list-none">
                <Link to="/category/beauty" className="link transition text-[14px] font-[500] block py-4" >Beauty</Link>
              </li>

              <li className="list-none">
                <Link to="/category/wellness" className="link transition text-[14px] font-[500] block py-4" >Wellness</Link>
              </li>

              <li className="list-none">
                <Link to="/category/jewellery" className="link transition text-[14px] font-[500] block py-4" >Jewellery</Link>
              </li>

            </ul>
          </div>

          <div className="col_3 w-[20%]">
            <p className="text-[14px] font-[500] flex item-center gap-2 md-0 mt-0">
              <GoRocket className="text-[18px]" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      {/*  categories panel component */}
      <CategoryPanel isOpenCatPanel={isOpenCatPanel}
        setIsOpenCatPanel={setIsOpenCatPanel} />
    </>
  );
};


export default Navigation;
