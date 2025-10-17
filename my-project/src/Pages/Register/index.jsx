import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import CircularProgress from '@mui/material/CircularProgress';

const Register = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormsFields] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const context = useContext(MyContext);
  const history = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formFields.name === "") {
      context.alertBox("Please enter your full name", "error");
      return false
    }

    if (formFields.email === "") {
      context.alertBox("Please enter your email", "error");
      return false
    }

    if (formFields.password === "") {
      context.alertBox("Please enter your password", "error");
      return false
    }

    if (formFields.phone === "") {
      context.alertBox("Please enter your phone number", "error");
      return false
    }

    setIsLoading(true);


    postData("/api/user/register", formFields).then((res) => {
      console.log(res);
      setIsLoading(false);

      if (res?.success === true) {
        context.alertBox(res?.message, "success");
        localStorage.setItem("userEmail", formFields.email);
        setFormsFields({
          name: "",
          email: "",
          password: "",
          phone: ""
        })

        history("/verify")
      }else{
        context.alertBox(res?.message, "error");
      }

    }).catch((error) => {
      setIsLoading(false);
      context.alertBox("Registration failed. Please try again.", "error");
    })



  }


  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black">
            Register with a new account
          </h3>

          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="name"
                id="name"
                name="name"
                label="Full Name"
                value={formFields.name}
                disabled={isLoading === true ? true : false}
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>


            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                name="email"
                label="Email Id"
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5">
              <TextField
                type="tel"
                id="phone"
                name="phone"
                label="Phone Number"
                value={formFields.phone}
                disabled={isLoading === true ? true : false}
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow === false ? "password" : "text"}
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                className="w-full"
                value={formFields.password}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
              <Button className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] 
              !min-w-[35px] !rounded-full !text-black" onClick={() => {
                  setIsPasswordShow(!isPasswordShow)
                }}>
                {
                  isPasswordShow === false ? <IoMdEye className="text-[20px] opacity-75" /> :
                    <IoMdEyeOff className="text-[20px] opacity-75" />
                }
              </Button>
            </div>

            <Link className="link cursor-pointer text-[14px] font-[600]" to="/forgot-password">Forgot Password?</Link>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button 
                type="submit" 
                disabled={isLoading || !valideValue} 
                className="btn-org btn-lg w-full flex gap-3"
                style={{
                  backgroundColor: '#ff5252',
                  color: '#fff',
                  padding: '12px 20px',
                  fontSize: '16px'
                }}
              >
                {
                  isLoading === true ? <CircularProgress color="inherit" size={20} />
                    :
                    'Register'
                }
              </Button>
            </div>

            <p className="text-center">Already have an account? <Link className="link text-[14px] font-[600]" to="/login">Login</Link></p>


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


export default Register;
