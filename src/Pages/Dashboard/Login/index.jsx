import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link, NavLink } from 'react-router-dom';
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from 'react-icons/fa6';
import LoadingButton from '@mui/lab/LoadingButton';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFb, setLoadingFb] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleClickGoogle() {
    setLoadingGoogle(true);
  }

  function handleClickFb() {
    setLoadingFb(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
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
        </h1>
        {/* <p className='text-center text-gray-500 mt-2'>Sign in with your credentials.</p> */}

        <div className='flex items-center justify-center w-full mt-6 gap-4'>
          <LoadingButton
            onClick={handleClickGoogle}
            startIcon={<FcGoogle/>}
            loading={loadingGoogle}
            variant="outlined"
            className='!py-2 !text-sm !capitalize !px-4 !text-gray-800 w-full'>
            Sign In With Google
          </LoadingButton>

           <LoadingButton
            onClick={handleClickFb}
            startIcon={<BsFacebook className="text-[#1877F2]"/>}
            loading={loadingFb}
            variant="outlined"
            className='!py-2 !text-sm !capitalize !px-4 !text-gray-800 w-full'>
            Sign In With Facebook
          </LoadingButton>
        </div>

        <div className='flex w-full items-center justify-center gap-3 my-6'>
          <span className='flex-grow h-[1px] bg-gray-200'></span>
          <span className='text-sm font-medium text-gray-500'>Or, Sign In With Your Email</span>
          <span className='flex-grow h-[1px] bg-gray-200'></span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='form-group mb-4 w-full'>
            <label className='text-sm font-medium mb-1 block' htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className='w-full h-12 border border-gray-200 rounded-md focus:border-gray-400 focus:outline-none px-3' required/>
          </div>

          <div className='form-group mb-4 w-full'>
            <label className='text-sm font-medium mb-1 block' htmlFor="password">Password</label>
            <div className='relative w-full'>
              <input type={isPasswordShow ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className='w-full h-12 border border-gray-200 rounded-md focus:border-gray-400 focus:outline-none px-3' required/>
              <Button className='!absolute top-1/2 -translate-y-1/2 right-2 z-10 !rounded-full !w-9 !h-9 !min-w-0 !text-gray-600'
              onClick={() => setIsPasswordShow(!isPasswordShow)}>
                {isPasswordShow ? <FaRegEye className='text-base' /> : <FaEyeSlash className='text-base' />}
              </Button>
            </div>
          </div>

          <div className='form-group mb-4 flex items-center justify-between'>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember me"
            />
            <Link to="/forgot-password" className='text-blue-600 font-semibold text-sm hover:underline'>
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" variant="contained" className='!bg-blue-600 !text-white !py-3 !text-base !font-bold w-full !normal-case'>Log In</Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
