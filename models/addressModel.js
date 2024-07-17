const { default: mongoose } = require("mongoose");
const validator = require("validator");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, "Street is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
