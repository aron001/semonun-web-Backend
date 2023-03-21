const nodemailer = require("nodemailer");
require ("dotenv").config;  
const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: 'aronhunde20@gmail.com',
        pass: '41390824',
      },
    });

    await transporter.sendMail({
      from: 'aronhunde20@gmail.com',
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;