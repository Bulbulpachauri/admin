import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/api';
import { CgLogIn } from 'react-icons/cg';
import { FaRegUser, FaRegEye, FaEyeSlash } from 'react-icons/fa6';

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordShow2, setIsPasswordShow2] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      context.alertBox('error', 'Passwords do not match!');
      return;
    }
    console.log({ password, password2 });
  };
  
  return (
<section className="bg-white w-full min-h-screen">
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
      <img src="/patern.webp" className="w-full h-full object-cover fixed top-0 left-0 opacity-5" alt="background-pattern"/>

      <div className='w-full max-w-md mx-auto pt-32 pb-20 relative z-40'>
        <div className='flex justify-center mb-4'>
          <img src="/icon.png" className='w-16 h-16' alt="icon"/>
        </div>

        <h1 className='text-center text-3xl font-extrabold'>
          Welcome Back!
          <br/>
          You can change your password from here
        </h1>
        
        <br/>

        <form onSubmit={handleSubmit}>
         
          <div className='form-group mb-4 w-full'>
            <label className='text-sm font-medium mb-1 block' htmlFor="password">New Password</label>
            <div className='relative w-full'>
              <input type={isPasswordShow ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className='w-full h-12 border border-gray-200 rounded-md focus:border-gray-400 focus:outline-none px-3' required/>
              <Button className='!absolute top-1/2 -translate-y-1/2 right-2 z-10 !rounded-full !w-9 !h-9 !min-w-0 !text-gray-600'
              onClick={() => setIsPasswordShow(!isPasswordShow)}>
                {isPasswordShow ? <FaRegEye className='text-base' /> : <FaEyeSlash className='text-base' />}
              </Button>
            </div>
          </div>

          <div className='form-group mb-4 w-full'>
            <label className='text-sm font-medium mb-1 block' htmlFor="password">Confirm Password</label>
            <div className='relative w-full'>
              <input type={isPasswordShow2 ? "text" : "password"} id="confirmPassword" value={password2} onChange={(e) => setPassword2(e.target.value)}
              className='w-full h-12 border border-gray-200 rounded-md focus:border-gray-400 focus:outline-none px-3' required/>
              <Button className='!absolute top-1/2 -translate-y-1/2 right-2 z-10 !rounded-full !w-9 !h-9 !min-w-0 !text-gray-600'
              onClick={() => setIsPasswordShow2(!isPasswordShow2)}>
                {isPasswordShow2 ? <FaRegEye className='text-base' /> : <FaEyeSlash className='text-base' />}
              </Button>
            </div>
          </div>

          <Button type="submit" variant="contained" className='!bg-blue-600 !text-white !py-3 !text-base !font-bold w-full !normal-case'>Reset Password</Button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;