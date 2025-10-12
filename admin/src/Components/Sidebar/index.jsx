import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { Collapse } from "react-collapse";
import { MyContext } from "../../context/MyContext";
import "./style.css";

const Sidebar = () => {

  const [subMenuIndex, setSubMenuIndex] = React.useState(null);
  const isOpenSubMenu = (index) => {
    setSubMenuIndex(prevIndex => (prevIndex === index ? null : index));
  }

  const Context = useContext(MyContext);

  return (
    <>
      <div className={`sidebar ${Context.isSidebarOpen ? 'w-1/6' : 'w-0'}`}>
        <div className="py-2 w-full">
          <NavLink to="/"><img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg" className="w-[250px]" /></NavLink>
        </div>


        <ul className="mt-4">
          <li>
            <NavLink to="/" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <RxDashboard className="text-lg" />
              <span>Dashboard</span>
            </NavLink>
          </li>


          <li>
            <Button className="sidebar-link" onClick={() => isOpenSubMenu(1)}>
              <FaRegImage className="text-lg" /><span>Home Slider</span>
              <span className="ml-auto w-8 h-8 flex items-center justify-center">
                <FaAngleDown className={`transition-all duration-300 ${subMenuIndex === 1 ? 'rotate-180' : ''}`} />
              </span>
            </Button>


            <Collapse isOpened={subMenuIndex === 1}>
              <ul className="submenu">
                <li>
                  <NavLink to="/home-slider" className={({isActive}) => `submenu-link ${isActive ? 'active' : ''}`}>
                    <span className="submenu-icon"></span>
                    Home Banner List
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/home-slider/add" className={({isActive}) => `submenu-link ${isActive ? 'active' : ''}`}>
                    <span className="submenu-icon"></span>
                    Add Home Banner
                  </NavLink>
                </li>

              </ul>
            </Collapse>

          </li>


          <li>
            <NavLink to="/users" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <FiUsers className="text-lg" /><span>User</span>
            </NavLink>
          </li>

          <li>
            <Button className="sidebar-link" onClick={() => isOpenSubMenu(3)}>
              <RiProductHuntLine className="text-lg" /><span>Products</span>
              <span className="ml-auto w-8 h-8 flex items-center justify-center">
                <FaAngleDown className={`transition-all duration-300 ${subMenuIndex === 3 ? 'rotate-180' : ''}`} />
              </span>
            </Button>


            <Collapse isOpened={subMenuIndex === 3}>
              <ul className="submenu">
                <li>
                  <NavLink to="/products" className={({isActive}) => `submenu-link ${isActive ? 'active' : ''}`}>
                    <span className="submenu-icon"></span>
                    Product List
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/product/upload" className={({isActive}) => `submenu-link ${isActive ? 'active' : ''}`}>
                    <span className="submenu-icon"></span>
                    Product Upload
                  </NavLink>
                </li>

              </ul>
            </Collapse>
          </li>

          <li>
            <Button className="sidebar-link" onClick={() => isOpenSubMenu(4)}>
              <TbCategory className="text-lg" /><span>Category</span>
              <span className="ml-auto w-8 h-8 flex items-center justify-center">
                <FaAngleDown className={`transition-all duration-300 ${subMenuIndex === 4 ? 'rotate-180' : ''}`} />
              </span>
            </Button>


            <Collapse isOpened={subMenuIndex === 4}>
              <ul className="submenu">
                <li>
                  <NavLink to="/categories" className={({isActive}) => `submenu-link ${isActive ? 'active' : ''}`}>
                    <span className="submenu-icon"></span>
                    Category List
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/categories/add" className={({isActive}) => `submenu-link ${isActive ? 'active' : ''}`}>
                    <span className="submenu-icon"></span>
                    Add a Category
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/categories/subCat" className={({isActive}) => `submenu-link ${isActive ? 'active' : ''}`}>
                    <span className="submenu-icon"></span>
                    Sub Category List
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/categories/subCat/add" className={({isActive}) => `submenu-link ${isActive ? 'active' : ''}`}>
                    <span className="submenu-icon"></span>
                    Add a Sub Category
                  </NavLink>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <NavLink to="/orders" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IoBagCheckOutline className="text-xl" /><span>Orders</span>
            </NavLink>
          </li>

          <li>
            <Button className="sidebar-link">
              <IoMdLogOut className="text-xl" /><span>Logout</span>
            </Button></li>


        </ul>

      </div>
    </>
  )
}

export default Sidebar;