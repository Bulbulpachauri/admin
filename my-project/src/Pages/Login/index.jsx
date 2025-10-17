import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/api';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormsFields] = useState({
    email: '',
    password: ''
  });

  const context = useContext(MyContext);
  const history = useNavigate();



  const forgotPassword = () => {

    if(formFields.email === ""){
      context.alertBox("error", "Please enter your email id");
      return false
    }
    else{
      context.alertBox("success", `OTP send to ${formFields.email}`);
      localStorage.setItem("userEmail", formFields.email);
      localStorage.setItem("actionType", "forgotPassword");

            postData("/api/user/forgot-password",{
              email : formFields.email
            }).then((res)=>{
              if(res?.error === false){
                context.alertBox("success", res?.message);
                history("/verify");
              }else{
                context.alertBox("error", res?.message);
              }
            })

            
    }

  }

  const onChangeInput = (e) => {
    let { name, value } = e.target;
    setFormsFields(() => {
      return {
        ...formFields,
        [name]: value
      }
    })
  }


  const valideValue = Object.values(formFields).every(el => el)
 
  const handleLogin = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if(formFields.email === ""){
      context.alertBox("error", "Please enter your email id");
      setIsLoading(false);
      return false
    }

    if(formFields.password === ""){
      context.alertBox("error", "Please enter your password");
      setIsLoading(false);
      return false
    }
    
    postData("/api/user/login", formFields).then((res) => {
      if(res?.success === true){
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("userEmail", formFields.email);
        context.setIsLogin(true);
        context.alertBox("success", "Login successful!");
        setIsLoading(false);
        history('/');
      } else {
        context.alertBox("error", res?.message || "Login failed");
        setIsLoading(false);
      }
    }).catch((error) => {
      context.alertBox("error", "Login failed");
      setIsLoading(false);
    });
  }


  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black">
            Login to your account
          </h3>

          <form className="w-full mt-5">
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
              <Button 
                type="submit" 
                className="btn-org btn-lg w-full" 
                onClick={handleLogin}
              >
                Login
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
