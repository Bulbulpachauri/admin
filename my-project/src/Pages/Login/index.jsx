import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormsFields] = useState({
    email: '',
    password: ''
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormsFields({
      ...formFields,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formFields.email) {
      context.alerBox("error", "Please enter your email");
      return;
    }
    
    if (!formFields.password) {
      context.alerBox("error", "Please enter your password");
      return;
    }
    
    setIsLoading(true);
    
    postData("/api/user/login", formFields).then((res) => {
      setIsLoading(false);
      if (res?.error !== true) {
        context.alerBox("success", res?.message);
        localStorage.setItem("token", res?.token);
        context.setIsLogin(true);
        history("/");
      } else {
        context.alerBox("error", res?.message);
      }
    }).catch((error) => {
      setIsLoading(false);
      context.alerBox("error", "Login failed. Please try again.");
    });
  };

  const forgotPassword = () => {
    history("/forgot-password");
  };


  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black">
            Login to your account
          </h3>

          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                label="Email Id"
                variant="outlined"
                className="w-full"
                name="email"
                value={formFields.email}
                onChange={onChangeInput}
                disabled={isLoading}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow===false ? 'password': 'text'}
                id="password"
                label="Password"
                variant="outlined"
                className="w-full"
                name="password"
                value={formFields.password}
                onChange={onChangeInput}
                disabled={isLoading}
              />
              <Button className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black" onClick={() => {
                setIsPasswordShow(!isPasswordShow)
              }}>
                {
                  isPasswordShow === false ? <IoMdEye className="text-[20px] opacity-75" /> :
                    <IoMdEyeOff className="text-[20px] opacity-75" />
                }
              </Button>
            </div>

            <a className="link cursor-pointer text-[14px] font-[600]" onClick={forgotPassword}>Forgot Password?</a>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button type="submit" disabled={isLoading || !formFields.email || !formFields.password} className="btn-org btn-lg w-full flex gap-3">
                {isLoading ? <CircularProgress color="inherit" size={20} /> : 'Login'}
              </Button>
            </div>

            <p className="text-center">Not Registered? <Link className="link text-[14px] font-[600]" to="/register">Sing Up</Link></p>


            <p className="text-center font-[500]">Or continue with social account</p>

            <Button className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black">
              <FcGoogle className="text-[20px]" />Login with Google
            </Button>

          </form>
        </div>
      </div>
    </section>
  );
};
 

export default Login;
