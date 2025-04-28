const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = (email, token) => {
  const verificationUrl = `http://localhost:5000/api/users/verify?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `<p>Please verify your email by clicking on the following link: <a href="${verificationUrl}">Verify Email</a></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendPasswordResetEmail = (email, token) => {
  const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset",
    text: `You requested a password reset. Click the following link to reset your password: ${resetUrl}`,
    html: `<p>You requested a password reset. Click the following link to reset your password: <a href="${resetUrl}">Reset Password</a></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendPasswordResetEmail, sendVerificationEmail };
