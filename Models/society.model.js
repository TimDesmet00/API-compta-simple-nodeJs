const mongoose = require("mongoose");

const societySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  vat: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  banq: {
    type: String,
    required: false,
  },
  factures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "facture",
    },
  ],
});

module.exports = mongoose.model("society", societySchema);
