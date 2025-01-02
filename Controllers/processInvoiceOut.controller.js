const ProcessInvoiceOut = require("../models/processInvoiceOut.model.js");
const Supplier = require("../models/supplier.model.js");
const validator = require("validator");

const createProcessInvoiceOut = async (req, res) => {
  // vérifier que la requête n'est pas vide
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  try {
    // Vérifier si la période existe déjà
    const existingPeriod = await ProcessInvoiceOut.findOne({
      period: req.body.period,
    });
    if (existingPeriod) {
      return res.status(400).json({
        status: "fail",
        message: "Period already exists",
      });
    }
    // Créer une nouvelle facture
    const processInvoiceOut = await ProcessInvoiceOut.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        processInvoiceOut,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message:
        error.message ||
        "An error occurred while creating the processInvoiceOut.",
    });
  }
};
