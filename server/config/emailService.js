import http from "http";
import nodemailer from "nodemailer";

// Configure the SMTP transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',//e.g., 'smtp.gmail.com' for Gmail
    port: 465, //or 465 for secure
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL, //your SMTP username
        pass: process.env.EMAIL_PASSWORD, //your SMTP password or app-specific password
    },
});

// Function to send an email
async function sendEmail(to, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        });
        return { success: true, messageId: info.messageId }
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message }
    }
}

export { sendEmail };