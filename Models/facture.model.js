const mongoose = require("mongoose");

const FactureSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client",
    required: true,
  },
  society: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "society",
    required: true,
  },
  totalHTVA: {
    type: Number,
    required: true,
  },
  totalTVA: {
    type: Number,
    required: true,
  },
  totalTTC: {
    type: Number,
    required: true,
  },
  raw: [
    {
      description: {
        type: String,
        required: true,
      },
      quantite: {
        type: Number,
        required: true,
      },
      pu: {
        type: Number,
        required: true,
      },
      vat: {
        type: Number,
        required: true,
      },
      totalHTVARaw: {
        type: Number,
        required: true,
      },
      totalTVARaw: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("facture", FactureSchema);
