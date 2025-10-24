import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';

const ForgotPassword = () => {

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordShow2, setIsPasswordShow2] = useState(false);
  const [formFields, setFormFields] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);
  const history = useNavigate();


  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    
    if(formFields.newPassword === ""){
      context.alertBox("error", "Please enter new password");
      return false;
    }
    
    if(formFields.confirmPassword === ""){
      context.alertBox("error", "Please confirm your password");
      return false;
    }
    
    if(formFields.newPassword !== formFields.confirmPassword){
      context.alertBox("error", "Passwords do not match");
      return false;
    }
    
    setIsLoading(true);
    
    postData("/api/user/reset-password", {
      email: localStorage.getItem("userEmail"),
      newPassword: formFields.newPassword,
      confirmPassword: formFields.confirmPassword
    }).then((res) => {
      setIsLoading(false);
      if(res?.error === false){
        context.alertBox("success", res?.message || "Password changed successfully!");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");
        history("/login");
      } else {
        context.alertBox("error", res?.message || "Failed to change password");
      }
    }).catch((error) => {
      setIsLoading(false);
      context.alertBox("error", "Failed to change password. Please try again.");
    });
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black">
            Reset Password
          </h3>

          <form className="w-full mt-5" onSubmit={handlePasswordReset}>
            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow===false ? 'password': 'text'}
                id="newPassword"
                label="New Password"
                variant="outlined"
                className="w-full"
                name="newPassword"
                value={formFields.newPassword}
                onChange={onChangeInput}
              />
               <Button type="button" className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] 
               !rounded-full !text-black" onClick={() => setIsPasswordShow(!isPasswordShow)}
              >
                {
                  isPasswordShow === false ? <IoMdEye className="text-[20px] opacity-75" /> :
                    <IoMdEyeOff className="text-[20px] opacity-75" />
                }
              </Button>
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow2===false ? 'password': 'text'}
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                className="w-full"
                name="confirmPassword"
                value={formFields.confirmPassword}
                onChange={onChangeInput}
              />
              <Button type="button" className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black" onClick={() => {
                setIsPasswordShow2(!isPasswordShow2)
              }}>
                {
                  isPasswordShow2 === false ? <IoMdEye className="text-[20px] opacity-75" /> :
                    <IoMdEyeOff className="text-[20px] opacity-75" />
                }
              </Button>
            </div>


            <div className="flex items-center w-full mt-3 mb-3">
              <Button type="submit" className="btn-org btn-lg w-full" disabled={isLoading}>
                {isLoading ? 'Changing Password...' : 'Change Password'}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};
 

export default ForgotPassword;
