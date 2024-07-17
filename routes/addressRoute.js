const express = require("express")
const addressRouter = express.Router()
const Address = require("../models/addressModel")
const Customer = require("../models/customerModel")

addressRouter.get("/addresses", async (req, res) => {
    try {
        const addresses = await Address.find({})
        res.status(200).json({ status: true, addresses })
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
})

addressRouter.get("/getAddressById/:id", async (req, res) => {
    try {
        const address = await Address.findById(req.params.id)
        if (!address) {
            return res.status(404).json({ status: false, message: "Address not found" })
        }
        res.status(200).json({ status: true, address })
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
})

addressRouter.post("/create", async (req, res) => {
    try {
      const { customerId, street, city, state, postalCode, country } = req.body;
      const newAddress = await Address.create({
        street,
        city,
        state,
        postalCode,
        country,
        customer: customerId,
      })
  
      await Customer.findByIdAndUpdate(customerId, { $push: { addresses: newAddress._id } })
  
      res.status(201).json({ status: true, message: "Address created", address: newAddress })
    } catch (error) {
      res.status(400).json({ status: false, message: error.message })
    }
  })
  

addressRouter.put("/update/:id", async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedAddress) {
            return res.status(404).json({ status: false, message: "Address not found" })
        }
        res.status(200).json({ status: true, message: "Address updated", address: updatedAddress })
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
});

addressRouter.delete("/delete/:id", async (req, res) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params.id)
        if (!deletedAddress) {
            return res.status(404).json({ status: false, message: "Address not found" })
        }
        await Customer.findByIdAndUpdate(deletedAddress.customer, { $pull: { addresses: deletedAddress._id } })
        res.status(200).json({ status: true, message: "Address deleted" })
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
})

module.exports = addressRouter
