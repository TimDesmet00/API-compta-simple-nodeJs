const mongoose = require("mongoose");

const FactureSchema = new mongoose.Schema({});

module.exports = mongoose.model("facture", FactureSchema);
