const mongoose = require("mongoose");

const MoiSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  rue: {
    type: String,
    required: true,
  },
  numero: {
    type: Number,
    required: true,
  },
  cp: {
    type: Number,
    required: true,
  },
  ville: {
    type: String,
    required: true,
  },
  tva: {
    type: String,
    required: false,
  },
  telephone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  banque: {
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

module.exports = mongoose.model("moi", MoiSchema);
