const mongoose = require('mongoose');
const { UploadModel, CustomerModel, AddtocartModel } = require('../model/model');
const cloudinary = require('cloudinary');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { customermail, ordered, useraccountNumber, userName,forgetmail } = require('../mailer');
require('dotenv').config()

const regist = (req, res) => {
    const information = req.body;
    let useremail = req.body.email;
    CustomerModel.find({ email }, (err, message) => {
        if (err) { } else {
            if (message == "") {
                CustomerModel.create(information, (err) => {
                    if (err) {
                        res.send({ message: "Email already used", status: false })
                    } else {
                        customermail(useremail)
                        res.send({ message: "saved", status: true })
                    }
                })
            } else {
                res.send({ message: "Email already used", status: false })
            }
        }
    })
}

const ordere = (req, res) => {
    const Name = req.body.Name;
    const Locatio = req.body.Location;
    const email = req.body.email;
    const id = req.body.id;
    const orded = req.body.ordered;
    let EMAIL = process.env.EMAIL
    let info = { EMAIL,email, Locatio, id, Name }
    useraccountNumber(orded)
    ordered(info)
    res.send({ message: "Mailed send", status: true })
}

const login = (req, res) => {
    const { email, password } = req.body;
    CustomerModel.findOne({ email }, async (err, message) => {
        if (err) {
            res.send(err)
        } else {
            if (!message) {
                res.send({ status: false, message: "Email not found" })
            }
            else {
                const validPassword = await bcrypt.compare(password, message.password);
                if (validPassword) {
                    const token = jwt.sign({ _id: message._id }, process.env.JWT_SECRET, { expiresIn: "2h" })
                    const id = message._id
                    res.send({ token, id, message: "Token generated", status: true });
                } else {
                    res.send({ status: false, message: "Invaild password" })
                }
            }
        }
    })
}

const display = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.send({ status: false, message: "Invalid Token" })
        } else {
            let id = decoded._id;
            CustomerModel.find({ _id: id }, (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    if (result.length > 0) {
                        res.send({ result, status: true, message: "Valid Token" })
                    }
                    else {
                        console.log(result);
                        res.send({ message: "empty array" })
                    }
                }
            })
        }
    })

}

const goods = (req, res) => {
    UploadModel.find((err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send({ result })
        }
    })
}

const onsale = (req, res) => {
    let selectedOption = req.body.Onsale
    UploadModel.find({ selectedOption }, (err, result) => {
        if (err) {
        } else {
            res.send({ result })
        }
    })
}

const fashion = (req, res) => {
    let selectedOption = req.body.fashio
    UploadModel.find({ selectedOption }, (err, result) => {
        if (err) {
        } else {
            res.send({ result })
        }
    })
}

const Viewproduct = (req, res) => {
    let _id = req.body.ViewproductId;
    UploadModel.find({ _id }, (err, result) => {
        if (err) {
        } else {
            res.send({ result })
        }
    })
}

const addtocart = (req, res) => {
    let _id = req.body.val;
    let customerId = req.body.customerId;
    let informatio = req.body.information;
    UploadModel.find({ _id }, (err, result) => {
        if (err) { } else {
            let addtocart = result[0];
            AddtocartModel.create({ ...req.body, customerId: customerId, product: addtocart.product, description: addtocart.description, price: addtocart.price, file: addtocart.file, information: informatio }, (err, result) => {
                if (err) { } else {
                    res.send({ message: "add-to-cart successfuly", result })
                }
            })
        }
    })
}

const getaddtocart = (req, res) => {
    let customerId = req.body.id
    AddtocartModel.find({ customerId }, (err, result) => {
        if (err) {
        } else {
            res.send({ result })
        }
    })
}

const removeaddtocart = (req, res) => {
    let { id } = req.body;
    AddtocartModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send({ result });
        }
    })
}
const removecart = (req, res) => {
    let customerId = req.body.id;
    AddtocartModel.findOneAndDelete({customerId}, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send({ result });
            console.log(result);
        }
    })
}

const Similarity = (req, res) => {
    let selectedOption = req.body.Similarity;
    UploadModel.find({ selectedOption }, (err, result) => {
        if (err) {
        } else {
            res.send({ result })
        }
    })
}

const Recentlyviewed = (req, res) => {
    let viewedProducts = req.body;
    const products = [];
    viewedProducts.forEach((id) => {
        UploadModel.find({ _id: id }, (err, result) => {
            if (err) { }
            if (result) {
                products.push(result[0]);
            }
            if (products.length === viewedProducts.length) {
                res.send({ products })
            }
        })
    })
}

const forgetpassword = (req, res) => {
    const email = req.body.mail;
    CustomerModel.findOne({ email }, async (err, message) => {
        if (err) {
            res.send(err);
        } else {
            if (!message) {
                res.send({ status: false, message: "Email not found" })
            } else {
                let email = message.email
                let name = message.Name
                let info = { email, name }
                forgetmail(info);
                res.send({ message: "Email sent", status: true });
            }
        }
    })
}

const forget = (req, res) => {
    const { email, newpassword } = req.body;
    CustomerModel.findOne({ email }, async (err, message) => {
        if (err) {
            res.send(err);
        } else {
            if (!message) {
                res.send({ status: false, message: "Email not found" })
            }
            else {
                const salt = await bcrypt.genSalt(10);
                const hashed =await bcrypt.hash(newpassword, salt);
                let infor = { _id: message._id, Name: message.Name, email: message.email, password: hashed }
                let _id = message._id
                CustomerModel.findByIdAndUpdate(_id, infor, (err, result) => {
                    if (err) { } else {
                        res.send({ message: "updated", result })
                    }
                })
            }
        }
    })
}

module.exports = { display, login, regist, goods, addtocart, Viewproduct, getaddtocart, removeaddtocart, Similarity, onsale, fashion, ordere, Recentlyviewed, removecart,forgetpassword,forget };