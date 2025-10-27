import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link, NavLink } from 'react-router-dom';
import { CgLogIn } from "react-icons/cg";
import { FaRegUser, FaRegEye, FaEyeSlash } from 'react-icons/fa6';

const ForgotPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Reset password:', { password });
  };

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
          Having trouble to sing in? Reset your password
        </h1>

        <form onSubmit={handleSubmit}>
          <div className='form-group mb-4 w-full'>
            <label className='text-sm font-medium mb-1 block' htmlFor="password">New Password</label>
            <div className='relative w-full'>
              <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className='w-full h-12 border border-gray-200 rounded-md focus:border-gray-400 focus:outline-none px-3' placeholder='Enter new password' required />
              <Button type="button" className='!absolute top-1/2 -translate-y-1/2 right-2 z-10 !rounded-full !w-9 !h-9 !min-w-0 !text-gray-600'
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash className='text-base' /> : <FaRegEye className='text-base' />}
              </Button>
            </div>
          </div>

          <div className='form-group mb-4 w-full'>
            <label className='text-sm font-medium mb-1 block' htmlFor="confirmPassword">Confirm Password</label>
            <div className='relative w-full'>
              <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full h-12 border border-gray-200 rounded-md focus:border-gray-400 focus:outline-none px-3' placeholder='Confirm new password' required />
              <Button type="button" className='!absolute top-1/2 -translate-y-1/2 right-2 z-10 !rounded-full !w-9 !h-9 !min-w-0 !text-gray-600'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash className='text-base' /> : <FaRegEye className='text-base' />}
              </Button>
            </div>
          </div>

          <Button type="submit" className='btn-blue btn-lg w-full'>Reset Password</Button>

          <br /><br/>
          <div className='text-center flex item-center justify-center gap-4'>
            <span>Don't want to reset? </span>
            <Link to="/login" className='text-blue-600 font-[700] hover:underline hover:text-gray-700'>Sign In?</Link>
          </div>

        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
