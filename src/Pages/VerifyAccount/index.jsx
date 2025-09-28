import React from 'react';
import Button from '@mui/material/Button';
import { Link, NavLink } from 'react-router-dom';
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from 'react-icons/fa6';

const VerifyAccount = () => {
  return (
    <section className="bg-white w-full h-[100vh]">
      <header className='w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50 bg-white border-b'>
        <Link to="/">
          <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg" className="w-[250px]" alt="logo" />
        </Link>

        <div className='flex items-center gap-2'>
          <NavLink to="/login" exact={true} activeClassName="isActive">
            {({ isActive }) => (
              <Button className={`!rounded-full !px-5 flex gap-2 ${isActive ? '!text-blue-600 !font-semibold' : '!text-gray-700'}`}>
                <CgLogIn className="text-lg" /> Login
              </Button>
            )}
          </NavLink>

          <NavLink to="/sign-up" exact={true} activeClassName="isActive">
            <Button className='!rounded-full !text-gray-700 !px-5 flex gap-2'>
              <FaRegUser className="text-base" /> Sign Up
            </Button>
          </NavLink>
        </div>
      </header>
      <img src="/patern.webp" className="w-full h-full object-cover fixed top-0 left-0 opacity-5" alt="background-pattern" />

      <div className='w-full max-w-md mx-auto pt-32 pb-20 relative z-40'>
        <div className='flex justify-center mb-4'>
          <img src="/icon.png" className='w-16 h-16' alt="icon" />
        </div>

        <h1 className='text-center text-3xl font-extrabold'>
          Welcome Back!
          <br />
          Please Verify your Email
        </h1>

        <br />
        <p className='text-center text-[15px]'>OTP send to
          <span className='text-blue-600 font-bold'> bulbulpachauri21@gmail.com</span>
        </p>

        <br />
        

      </div>
    </section>
  );
};

export default VerifyAccount;