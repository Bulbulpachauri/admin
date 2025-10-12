import React from 'react';
import OtpBox from '../../components/OtpBox';
import { Button } from '@mui/material';

 const Verify = () => {

  const handleOtpSubmit = (otp) => {
    console.log("OTP Submitted: ", otp);
    // You can handle the OTP verification logic here
  }

  const verifyOTP=(e)=>{
    e.preventDefault();
    alert(otp)
  }

  return (
    <section className="section py-10">
         <div className="container">
           <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
              <div className="text-center mb-4">
                <img src="/verify.2.png" width="80" className='m-auto'/>
              </div>
              <h3 className="text-center text-[18px] text-black font-semibold mt-4 mb-1">
               Verify OTP
             </h3>

             <p className="text-center mt-0 mb-4">OTP send to <span className="text-red-500 font-bold">bulbulpachauri@gmail.com</span></p>

             <from onSubmit={verifyOTP}>
              <OtpBox length={6} onSubmit={handleOtpSubmit}/>

             <div className="flex items-center justify-center mt-5 px-3">
              <Button type='submit' className="w-full btn-org btn-lg">Verify OTP</Button>
             </div>
             </from>

           </div>
         </div>
       </section>
  );
};

export default Verify;