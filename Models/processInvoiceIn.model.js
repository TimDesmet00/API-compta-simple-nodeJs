const mongoose = require("mongoose");

const ProcessInvoiceInSchema = new mongoose.Schema({
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
        supplier: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "supplier",
          required: true,
        },
        prixTVAC: {
          type: Number,
          required: true,
        },
        amountHT: [
          {
            "march (81)": {
              type: Number,
              required: true,
            },
            "charges (82)": {
              type: Number,
              required: true,
            },
            "invest (83)": {
              type: Number,
              required: true,
            },
          },
        ],
        "deductibleTVA (59)": {
          type: Number,
          required: true,
        },
      },
    ],
    totalTVAC: {
      type: Number,
      required: true,
    },
    totalMarch: {
      type: Number,
      required: true,
    },
    totalCharges: {
      type: Number,
      required: true,
    },
    totalInvest: {
      type: Number,
      required: true,
    },
    totalDeductibleTVA: {
      type: Number,
      required: true,
    },
  },
});

module.exports = mongoose.model("processInvoiceIn", ProcessInvoiceInSchema);
