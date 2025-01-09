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
  totalTvac: [
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
      totalCash: {
        type: Number,
        required: false,
      },
    },
  ],
  totalHTVA: [
    {
      "0% 00": {
        type: Number,
        required: false,
      },
      "6% 01": {
        type: Number,
        required: false,
      },
      "12% 02": {
        type: Number,
        required: false,
      },
      "21% 03": {
        type: Number,
        required: false,
      },
      totalCash: {
        type: Number,
        required: false,
      },
    },
  ],
  totalTVA: [
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
      "totalTVA 54": {
        type: Number,
        required: false,
      },
    },
  ],
});
