const mongoose = require("mongoose");

const ProcessInvoiceOutSchema = new mongoose.Schema({
  period: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(0[1-9]|1[0-2])-(\d{4})$/.test(v); // Valide le format MM-YYYY
      },
      message: (props) =>
        `${props.value} is not a valid period format! Use MM-YYYY.`,
    },
    data: [
      {
        number: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        customer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "client",
          required: true,
        },
        priceTVAC: {
          type: Number,
          required: true,
        },
        amountHT: [
          {
            "TVA0% (00)": {
              type: Number,
              required: false,
            },
            "TVA6% (01)": {
              type: Number,
              required: false,
            },
            "TVA12% (02)": {
              type: Number,
              required: false,
            },
            "TVA21% (03)": {
              type: Number,
              required: false,
            },
          },
        ],
        "dueTVA (54)": {
          type: Number,
          required: true,
        },
      },
    ],
    totalTVAC: {
      type: Number,
      required: true,
    },
    totalTVA0: {
      type: Number,
      required: true,
    },
    totalTVA6: {
      type: Number,
      required: true,
    },
    totalTVA12: {
      type: Number,
      required: true,
    },
    totalTVA21: {
      type: Number,
      required: true,
    },
    totalDueTVA: {
      type: Number,
      required: true,
    },
    closed: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model("processInvoiceOut", ProcessInvoiceOutSchema);
