import { useContext, useState, useEffect } from 'react';
import OtpBox from '../../components/OtpBox';
import { Button } from '@mui/material';
import { postData } from '../../utils/api';
import { useNavigate } from "react-router-dom";
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';

 const Verify = () => {
  const [otp,setOtp]=useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const handleOtpSubmit=(value)=>{
    setOtp(value);
  };

  const history = useNavigate();
  const context = useContext(MyContext);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    } else {
      context.alertBox("error", "No email found. Please register first.");
      history("/register");
    }
  }, []);

  const verifyOTP = (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      context.alertBox("error", "Please enter complete 6-digit OTP");
      return;
    }

    setIsLoading(true);
    
    postData("/api/user/verifyEmail",{
      email: localStorage.getItem("userEmail"),
      otp: otp
    }).then((res)=>{
      setIsLoading(false);
      if(res?.error === false){
        context.alertBox("success", res?.message);
        const actionType = localStorage.getItem("actionType");
        
        if(actionType === "forgotPassword"){
          localStorage.removeItem("actionType");
          history("/forgot-password");
        } else {
          localStorage.removeItem("userEmail");
          history("/login");
        }
      }else{
        context.alertBox("error", res?.message);
      }
    }).catch((error) => {
      setIsLoading(false);
      context.alertBox("error", "Verification failed. Please try again.");
    })
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

             <p className="text-center mt-0 mb-4">OTP sent to <span className="text-red-500 font-bold">{userEmail || 'your email'}</span></p>

             <form onSubmit={verifyOTP}>
              <OtpBox length={6} onSubmit={handleOtpSubmit}/>

             <div className="flex items-center justify-center mt-5 px-3">
              <Button 
                type='submit' 
                disabled={isLoading || otp.length !== 6} 
                className="w-full btn-org btn-lg"
                style={{
                  backgroundColor: '#ff5252',
                  color: '#fff',
                  padding: '12px 20px',
                  fontSize: '16px'
                }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress color="inherit" size={20} />
                    <span className="ml-2">Verifying...</span>
                  </>
                ) : 'Verify OTP'}
              </Button>
             </div>
             </form>

           </div>
         </div>
       </section>
  );
};

export default Verify;