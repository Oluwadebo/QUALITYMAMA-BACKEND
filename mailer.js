const nodemailer = require('nodemailer')
let date = new Date().toLocaleString();

let sName;

let itemsHtml = `<ul style="list-style-type: none;">`;
const useraccountNumber = (accountNumber) => {
  accountNumber.forEach(function (item) {
    itemsHtml += '<li>' + item.product + ' - ' + item.price + '</li>';
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
    subject: "QUALITYMAMA ✔",
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
          Contact 09044796430 or Email: ogunweoluwadebo@gmail.com <br />
          for WEB SITE DEVELOPMENT
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
    subject: "Anthony app ✔",
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
          Contact 09044796430 or Email: ogunweoluwadebo@gmail.com <br />
          for WEB SITE DEVELOPMENT
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
    to: emails.asd,
    subject: "Ordered Product From Qualitymama Store",
    html: `<div
        style="
          background: #f0f0f0;
          transition: 0.5s;
          font-family: Livvic;
          padding: 20px;
        ">
        <h3 style="text-align: left;padding: 0px 45px;">
          Dear Admin. <br/> Our customer ${sName}, Has an order, Here are the details of the order:
        </h3>
        <h3 style="text-align: left;padding: 0px 15px;">
          ${itemsHtml}
        </h3>
        <h3 style="text-align: left;padding: 0px 45px;">
        at <span>${date}</span> to be deliveried to this ${emails.Locatio} Location.
        </h3>
        <h4 style="text-align: center">
        Thank you for shopping with us! <br/>  Contact 09044796430 or Email: ogunweoluwadebo1@gmail.com <br /> for more enquires.
        </h4>
      </div>`,
  });
}

module.exports = { customermail, adminmail, ordered, useraccountNumber, userName, }