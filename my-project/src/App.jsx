import React, { useState } from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home/index.jsx";
import ProductListing from "./Pages/ProductListing/index.jsx";
import { ProductDetails } from "./Pages/ProductDetails/index.jsx";
import { createContext } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ProductZoom } from "./components/ProductZoom";
import { ProductDetailsComponent } from "./components/ProductDetails";
import { IoCloseSharp } from "react-icons/io5";
import Login from "./Pages/Login/index.jsx";
import Register from "./Pages/Register/index.jsx";
import CartPage from "./Pages/Cart/index.jsx";
import Verify from "./Pages/Verify/index.jsx";
import ForgotPassword from "./Pages/ForgotPassword/index.jsx"
import MyList from "./Pages/MyList/index.jsx";
import Checkout from "./Pages/Checkout/index.jsx";
import MyAccount from "./Pages/MyAccount/index.jsx";
import Orders from "./Pages/Orders/index.jsx";

import toast, { Toaster } from 'react-hot-toast';

const MyContext = createContext();

function App() {
  const [openProductDetailModal, setOpenProductDetailsModal] = useState(false);
  const [maxWidth, setMaxWidth] = useState('lg');
  const [fullWidth, setFullWidth] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const [openCartPanel, setOpenCartPanel] = useState(false);


  const handleCloseProductDetailModal = () => {
    setOpenProductDetailModal(false);
  };


  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };


  const alerBox = (msg, type) =>{
    if(type === "success"){
      toast.success(msg);
    }
    if(type === "error"){
      toast.error(msg);
    }
  }


  const openAlertBox = (status, msg) => {
    
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  }


  const value = {
    // Match consumer usage: context.setOpenProductDetailsModal(true)
    setOpenProductDetailsModal,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    openAlertBox,
    isLogin,
    setIsLogin
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={value}>
          <Header />
          <Routes>
            <Route path={"/"} exact={true} element={<Home />} />
            <Route path={"/productListing"} exact={true} element={<ProductListing />} />
            <Route path={"/product/:id"} exact={true} element={<ProductDetails />} />
            <Route path={"/Login"} exact={true} element={<Login />} />
            <Route path={"/register"} exact={true} element={<Register />} />
            <Route path={"/cart"} exact={true} element={<CartPage />} />
            <Route path={"/verify"} exact={true} element={<Verify />} />
            <Route path={"/forgot-password"} exact={true} element={<ForgotPassword />} />
            <Route path={"/checkout"} exact={true} element={<Checkout />} />
            <Route path={"/my-account"} exact={true} element={<MyAccount />} />
            <Route path={"/my-list"} exact={true} element={<MyList />} />
            <Route path={"/my-orders"} exact={true} element={<Orders />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>


      <Dialog
        open={openProductDetailModal}
        onClick={handleCloseProductDetailModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="productDetailModal"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogContent>
          <div className="flex items-center w-full productDetailModalContainer">
            <Button
              className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[15px] bg-[#f1f1f1]"
              onClick={handleCloseProductDetailModal}
            >
              <IoCloseSharp className="text-[20px]" />
            </Button>
            <div className="col1 w-[40%]">
              <ProductZoom />
            </div>

            <div className="col2 w-[60%] py-8 px-8 pr-16 productContent">
              <ProductDetailsComponent />
            </div>
          </div>
        </DialogContent>
      </Dialog>



      <Toaster />


    </>
  );
}

export default App;

export { MyContext }