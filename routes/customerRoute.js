const express = require("express")
const customerRouter = express.Router()
const Customer = require("../models/customerModel")
const Address = require("../models/addressModel")

customerRouter.get("/customers", async (req, res) => {
    try {
        let customers = await Customer.find({}).populate('addresses');
        res.status(200).send({ status: true, message: "Customers listed", customers })
    } catch (error) {
        res.status(400).send({ status: false, message: error.message })
    }
})

customerRouter.get("/getCustomerById/:id", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('addresses')
        if (!customer) {
            return res.status(404).json({ status: false, message: "Customer not found" })
        }
        console.log(customer)
        res.status(200).json({ status: true, customer })
    } catch (error) {
        console.error(error)
        res.status(400).json({ status: false, message: error.message })
    }
})


customerRouter.post("/create", async (req, res) => { 
    try {
        let createdCustomer = await Customer.create(req.body);
        res.status(200).send({ status: true, message: "Customer created", customer: createdCustomer })
    } catch (error) {
        res.status(400).send({ status: false, message: error.message })
    }
})

customerRouter.post("/:id/address", async (req, res) => {
    try {
        const customerId = req.params.id
        const addressData = req.body
        addressData.customer = customerId

        let createdAddress = await Address.create(addressData);
        await Customer.findByIdAndUpdate(customerId, { $push: { addresses: createdAddress._id } })

        res.status(200).send({ status: true, message: "Address added to customer", address: createdAddress })
    } catch (error) {
        res.status(400).send({ status: false, message: error.message })
    }
})

customerRouter.delete("/delete/:id", async (req, res) => {
    try {
        let customer = await Customer.findByIdAndDelete(req.params.id)
        if (!customer) {
            return res.status(404).send({ status: false, message: "Customer not found" })
        }
        await Address.deleteMany({ customer: customer._id })
        res.status(200).send({ status: true, message: "Customer and their addresses deleted" })
    } catch (error) {
        res.status(400).send({ status: false, message: error.message })
    }
})

customerRouter.put("/update/:id", async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedCustomer) {
            return res.status(404).send({ status: false, message: "Customer not found" })
        }
        res.status(200).send({ status: true, message: "Customer updated", customer: updatedCustomer })
    } catch (error) {
        res.status(400).send({ status: false, message: error.message })
    }
})

module.exports = customerRouter
