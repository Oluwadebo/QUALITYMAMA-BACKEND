const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
let date = new Date().toLocaleString();

let sName;

let itemsHtml = `<ul style="list-style-type: none;">`;
const useraccountNumber = (accountNumber) => {
  accountNumber.forEach(function (item, index) {
    itemsHtml += '<li>' + item.product + ' - ' + item.information + ' - ' + item.price + '</li>';
  });
  itemsHtml += '</ul>';
}

const userName = (Name) => {
  sName = Name;
}

const customermail = async (emails) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.email",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAIL_PASSWORD
    }
  })

  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: emails,
    subject: "QUALITYMAMA",
    // text: "Hello world?",
    html: `<div
        style="
          background: #f0f0f0;
          transition: 0.5s;
          font-family: Courier New monospace;
          padding: 20px;
        ">
        <h2 style="text-align: center">
          THANKS FOR CREATING AN ACCOUNT WITH US.
        </h2>
        <h3 style="text-align: center">
          Welcome to our site. <br />
          Your account was successfully created at <span>${date}</span>.
        </h3>
        <h4 style="text-align: center">
        Contact: 09044796430, 08104495801, 08087683003 or Email: qualitymamaddg@gmail.com<br />
        for more enquires.
        </h4>
      </div>`,

  });
}

const adminmail = async (emails) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.email",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAIL_PASSWORD
    }
  })

  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: emails,
    subject: "QUALITYMAMA",
    // text: "Hello world?",
    html: `<div
        style="
          background: #f0f0f0;
          transition: 0.5s;
          font-family: Courier New monospace;
          padding: 20px;
        ">
        <h2 style="text-align: center">
          THANKS FOR CREATING AN ACCOUNT WITH US.
        </h2>
        <h3 style="text-align: center">
          Welcome to our site. <br />
          Your account as one of our admin, was successfully created at <span>${date}</span>.
        </h3>
        <h4 style="text-align: center">
          Contact: 09044796430, 08104495801, 08087683003 or Email: qualitymamaddg@gmail.com<br />
          for more enquires.
        </h4>
      </div>`,

  });
}

const ordered = async (emails) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.email",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAIL_PASSWORD
    }
  })

  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: emails.EMAIL,
    subject: "Order Confirmation for Qualitymama Store Admin",
    html: `<div
        style="
          background: #f0f0f0;
          transition: 0.5s;
          font-family: Livvic;
          padding: 20px;
        ">
        <h3 style="text-align: left;padding: 0px 45px;">
          Dear Admin. <br/>I am writing to Inform about the recently placed order, Which is to be delivered to    ${emails.Locatio}. <br/> Order Details: <br/>
        </h3>
        <h3 style="text-align: left;padding: 0px 15px;">
        Name - information - price <br/>
          ${itemsHtml}<br/>The order was placed by the following customer:<br>Name: ${emails.Name} <br/>Email     ${emails.EMAIL}
        </h3>
        <h4 style="text-align: center">
        Thank you for shopping with us! <br/>  Contact: 09044796430, 08104495801, 08087683003 or Email: qualitymamaddg@gmail.com<br /> for more enquires.
        </h4>
      </div>`,
  });
  let send = await transporter.sendMail({
    from: process.env.EMAIL,
    to: emails.email,
    subject: "Ordered Product From Qualitymama Store",
    html: `<div
        style="
          background: #f0f0f0;
          transition: 0.5s;
          font-family: Livvic;
          padding: 20px;
        ">
        <h3 style="text-align: left;padding: 0px 45px;">
          Dear ${emails.Name}. <br/> Here are the details of your order:
        </h3>
        <h3 style="text-align: left;padding: 0px 15px;">
          ${itemsHtml}
        </h3>
        <h3 style="text-align: left;padding: 0px 45px;">
        at <span>${date}</span> will be delivered to this Location, ${emails.Locatio}.
        </h3>
        <h4 style="text-align: center">
        Thank you for shopping with us! <br/>  Contact or chat: 09044796430, 08104495801, 08087683003 or Email: qualitymamaddg@gmail.com <br /> for more enquires.
        </h4>
      </div>`,
  });
}

const adminfpmail = async (emails) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.email",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAIL_PASSWORD
    }
  })

  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: emails.email,
    subject: "Password Reset Request from QUALITYMAMA",
    html: `<div
        style="
          background: #f0f0f0;
          transition: 0.5s;
          font-family: Courier New monospace;
          padding: 20px;
        ">
        <h2>Dear Admin ${emails.name},</h2>
        <h4>
        We have received a request to reset your password from qualitymama. If you did not make this request, please ignore this email.<br/> If you did request a password reset, please click the link below:<br/><br/><a href="http://qualitymama.vercel.app/Forgetpassword" style="background-color: #16325a; color: #ffffff; border: solid #0278ff; text-decoration: none; z-index: 1; transition: background-color 1s cubic-bezier(0.455, 0.03, 0.515, 0.955);padding:10px;">Reset Password</a><br/><br/>Please note that if you did not request a password reset, it is possible that someone else has tried to gain access to your QUALITYMAMA account. In this case, we recommend that you change your password immediately for security. <br/><br/> If you have any questions or concerns, please do not hesitate to contact Us at qualitymamaddg@gmail.com
        </h4>
      </div>`,
  });
}

const forgetmail = async (emails) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.email",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAIL_PASSWORD
    }
  })

  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: emails.email,
    subject: "Password Reset Request from QUALITYMAMA",
    html: `<div
        style="
          background: #f0f0f0;
          transition: 0.5s;
          font-family: Courier New monospace;
          padding: 20px;
        ">
        <h2>Dear ${emails.name},</h2>
        <h4>
        We have received a request to reset your password from qualitymama. If you did not make this request, please ignore this email.<br/> If you did request a password reset, please click the link below:<br/><br/><a href="http://qualitymama.vercel.app/Resetpassword" style="background-color: #16325a; color: #ffffff; border: solid #0278ff; text-decoration: none; z-index: 1; transition: background-color 1s cubic-bezier(0.455, 0.03, 0.515, 0.955);padding:10px;">Reset Password</a><br/><br/>Please note that if you did not request a password reset, it is possible that someone else has tried to gain access to your QUALITYMAMA account. In this case, we recommend that you change your password immediately for security. <br/><br/> If you have any questions or concerns, please do not hesitate to contact Us at qualitymamaddg@gmail.com
        </h4>
      </div>`,
  });
}

module.exports = { customermail, adminmail, ordered, useraccountNumber, userName, adminfpmail,forgetmail }