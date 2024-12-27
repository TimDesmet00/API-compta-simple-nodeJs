const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, "Un nom est requis"],
  },
  rue: {
    type: String,
    required: [true, "Une rue est requise"],
  },
  numero: {
    type: Number,
    required: [true, "Un numéro est requis"],
  },
  cp: {
    type: Number,
    required: [true, "Un code postal est requis"],
  },
  ville: {
    type: String,
    required: [true, "Une ville est requise"],
  },
  tva: {
    type: String,
    required: false,
  },
  telephone: {
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

module.exports = mongoose.model("Client", ClientSchema);
