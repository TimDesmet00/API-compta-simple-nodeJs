const mongoose = require("mongoose");

const FactureSchema = new mongoose.Schema({
  numero: {
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  totalHT: {
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
  lignes: [
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
      tva: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("facture", FactureSchema);
