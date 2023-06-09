const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const uploadSchema = new mongoose.Schema(
    {
        product: String,
        price: String,
        file: String,
        adminId: String,
        description: String,
        selectedOption: String,
        Pprice: String,
        dateAdded: {
            type: String,
            default: new Date().toLocaleDateString()
        },
    }
)

const CustomerSchema = new mongoose.Schema(
    {
        Name: String,
        email: {
            type: String,
            unique: true,
        },
        password: String,
    }
)
CustomerSchema.pre("save", async function (next) {
    let { password, email } = this;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    this.password = hashed;
    this.email = email.toLowerCase();
    next();
})

const AdminSchema = new mongoose.Schema(
    {
        Name: String,
        email: {
            type: String,
            unique: true,
        },
        gender: String,
        password: String,
    }
)
AdminSchema.pre("save", async function (next) {
    let { password, email } = this;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    this.password = hashed;
    this.email = email.toLowerCase();
    next();
})

const AddtocartSchema = new mongoose.Schema(
    {
        customerId: {
            type: String,
            require: true,
        },
        product: String,
        description: String,
        price: String,
        file: String,
        information: String,
    }
)

const UploadModel = mongoose.model('files', uploadSchema)
const CustomerModel = mongoose.model('Customer', CustomerSchema)
const AdminModel = mongoose.model('Admin', AdminSchema)
const AddtocartModel = mongoose.model('Addtocart', AddtocartSchema)

module.exports = { UploadModel, CustomerModel, AdminModel, AddtocartModel };