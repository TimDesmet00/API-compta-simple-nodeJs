const mongoose = require("mongoose");

const RevenueJournalSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salesTVAC: [
    {
      "0%": {
        type: Number,
        required: false,
      },
    },
  ],
});
