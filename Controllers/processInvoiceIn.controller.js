const processInvoiceIn = require("../Models/processInvoiceIn.model");
const supplier = require("../Models/supplier.model");
const validator = require("validator");

const createProcessInvoiceIn = async (req, res) => {
  // vérifier que la requête n'est pas vide
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  if (!req.body.period) {
    return res.status(400).send({
      message: "Period can not be empty!",
    });
  }

  try {
    const processInvoiceIn = await processInvoiceIn.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        processInvoiceIn,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message:
        error.message ||
        "An error occurred while creating the processInvoiceIn.",
    });
  }
};
