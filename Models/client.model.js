const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Un nom est requis"],
  },
  address: {
    type: String,
    required: [true, "Une rue est requise"],
  },
  number: {
    type: Number,
    required: [true, "Un numéro est requis"],
  },
  zipcode: {
    type: Number,
    required: [true, "Un code postal est requis"],
  },
  city: {
    type: String,
    required: [true, "Une ville est requise"],
  },
  country: {
    type: String,
    required: [true, "Un pays est requis"],
  },
  vat: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: [true, "Un numéro de téléphone est requis"],
  },
  email: {
    type: String,
    required: [true, "Une adresse email est requise"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v);
      },
      message: (props) => `${props.value} n'est pas une adresse email valide!`,
    },
  },
  banq: {
    type: String,
    required: false,
  },
  invoices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "facture",
    },
  ],
});

module.exports = mongoose.model("Client", ClientSchema);
