const express = require("express");
const path = require('path');
const dotenv = require('dotenv')
const http = require("http");
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary')
const { Server } = require("socket.io");

const app = express();
dotenv.config();

const { checker } = require("./middleware/middleware");
const { users, adduser } = require("./store");
const { sendmail } = require("./mailer");
const { adminregist, adminlogin, admin, file, adminfiles, delproduct } = require("./control/admincontroler");
const { display, login, regist, addtocart, goods, Viewproduct, getaddtocart, removeaddtocart, Similarity } = require("./control/customercontroler");

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, }).then((res) => {
    console.log("Server 5020 connected successfuly")
}).catch(err => {
    console.log(err);
})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.post("/adminsignup", adminregist)
app.post("/adminsignin", adminlogin)
app.get("/Admin", admin)
app.post("/adminfiles", adminfiles)
app.post("/admindel", delproduct)
app.post("/files", file)

app.get("/dashboard", display)
app.post("/customersignup", regist)
app.post("/customersignin", login)
app.get("/goods", goods)
app.post("/Similarity", Similarity)
app.post("/Viewproduct", Viewproduct)
app.post("/getaddtocart", getaddtocart)
app.post("/addtocart", addtocart)
app.post("/removeaddtocart", removeaddtocart)

const port = process.env.PORT || 5020

app.listen(port, () => {
    console.log("Server 5020 started");
})