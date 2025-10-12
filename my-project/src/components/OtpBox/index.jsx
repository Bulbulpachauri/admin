import React, { useRef, useState } from 'react';

const OtpBox = ({ length = 6, onSubmit }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  // Handle change in input
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last digit if more than one typed
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus(); // Move to next input
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Combine OTP and send to parent
  const handleSubmit = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length === length) {
      if (onSubmit) {
        onSubmit(fullOtp);
      }
    } else {
      alert('Please enter complete OTP');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {otp.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            ref={(el) => (inputsRef.current[idx] = el)}
            maxLength={1}
            style={{
              width: '40px',
              height: '40px',
              textAlign: 'center',
              fontSize: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        ))}
      </div>

      <button onClick={handleSubmit}  className="bg-primary text-white w-full text-center py-2 mt-5 rounded-md">
        Submit OTP
      </button>
    </div>
  );
};

export default OtpBox;