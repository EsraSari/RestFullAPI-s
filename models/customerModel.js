const {default: mongoose} = require("mongoose")
const validator = require("validator")

const customerSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "E-mail is required"],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Please enter a correct email address"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }]
})

const Customer = mongoose.model("Customers", customerSchema)

module.exports = Customer