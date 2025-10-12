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

    // Send updated OTP to parent
    if (onSubmit) {
      onSubmit(newOtp.join(''));
    }

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
    </div>
  );
};

export default OtpBox;