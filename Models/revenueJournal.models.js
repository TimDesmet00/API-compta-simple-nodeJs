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
      "6%": {
        type: Number,
        required: false,
      },
      "12%": {
        type: Number,
        required: false,
      },
      "21%": {
        type: Number,
        required: false,
      },
    },
  ],
  receipt: [
    {
      cash: {
        type: Number,
        required: false,
      },
      card: {
        type: Number,
        required: false,
      },
      transfer: {
        type: Number,
        required: false,
      },
    },
  ],
  receiptNumber: {
    type: Number,
    required: false,
  },
});
