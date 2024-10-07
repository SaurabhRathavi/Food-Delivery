const nodemailer = require("nodemailer");

const sendForgotPasswordMail = async (resetLink, email) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Password Reset",
    html: `<p>You requested a password reset. Click the link below to reset your password:${resetLink}`,
  });
};

module.exports = { sendForgotPasswordMail };
