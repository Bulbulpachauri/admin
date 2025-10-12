const VerificationEmail = (username, otp) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #4CAF50;
        }
        .content {
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
            color: #333;
        }
        .otp {
            font-weight: bold;
            font-size: 24px;
            color: #ff9800;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #777;
            font-size: 14px;
        }
        </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>Verify Your Email Address</h1>
    </div>
    <div class="content">

        <p>Hello ${username}, thank you for registering with Spice Gold. Please use the following OTP to verify your email address:</p>
        <div class="otp">${otp}</div>
        <p>If you didn't request this, please ignore this email.</p>
    </div>
    <div class="footer">
    <p>&copy; 2025 Spice Gold. All rights reserved.</p>
    </div>
    </div>
</body>
</html>   
`;
};

export { VerificationEmail };