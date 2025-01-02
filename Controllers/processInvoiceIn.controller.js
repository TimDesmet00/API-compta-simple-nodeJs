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

  try {
    // Vérifier si la période existe déjà
    const existingPeriod = await ProcessInvoiceIn.findOne({
      period: req.body.period,
    });
    if (existingPeriod) {
      return res.status(400).json({
        status: "fail",
        message: "Period already exists",
      });
    }
    // Créer une nouvelle facture
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

const getAllProcessInvoiceIn = async (req, res) => {
  try {
    const processInvoiceIn = await processInvoiceIn.find().populate("supplier");
    res.status(200).json({
      status: "success",
      results: processInvoiceIn.length,
      data: {
        processInvoiceIn,
      },
    });
  } catch (error) {
    console.error("Error retrieving processInvoiceIn", error);
    res.status(500).json({
      status: "fail",
      message:
        error.message || "An error occurred while retrieving processInvoiceIn.",
    });
  }
};

const getProcessInvoiceInById = async (req, res) => {
  try {
    const processInvoiceIn = await processInvoiceIn
      .findById(req.params.id)
      .populate("supplier");
    if (!processInvoiceIn) {
      return res.status(404).json({
        status: "fail",
        message: "ProcessInvoiceIn not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        processInvoiceIn,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message:
        error.message ||
        "An error occurred while retrieving the processInvoiceIn.",
    });
  }
};

const updateProcessInvoiceIn = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  try {
    const existingProcessInvoiceIn = await ProcessInvoiceIn.findById(
      req.params.id
    );
    if (!existingProcessInvoiceIn) {
      return res.status(404).send({
        message: `Cannot update processInvoiceIn with id=${req.params.id}. Maybe processInvoiceIn was not found!`,
      });
    }

    // Vérifier si l'entrée est fermée
    if (existingProcessInvoiceIn.closed) {
      return res.status(400).send({
        message: "Cannot update a closed processInvoiceIn.",
      });
    }

    const processInvoiceIn = await processInvoiceIn.findByIdAndUpdate(
      req.params.id,
      req.body,
      { useFindAndModify: false }
    );
    if (!processInvoiceIn) {
      return res.status(404).send({
        message: `Cannot update processInvoiceIn with id=${req.params.id}. Maybe processInvoiceIn was not found!`,
      });
    }
    res.status(200).send({
      message: "ProcessInvoiceIn was updated successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error updating processInvoiceIn with id=" + req.params.id,
    });
  }
};

const updateAndCloseProcessInvoiceIn = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  try {
    const processInvoiceIn = await processInvoiceIn.findByIdAndUpdate(
      req.params.id,
      { ...req.body, closed: true },
      { useFindAndModify: false }
    );
    if (!processInvoiceIn) {
      return res.status(404).send({
        message: `Cannot update processInvoiceIn with id=${req.params.id}. Maybe processInvoiceIn was not found!`,
      });
    }
    res.status(200).send({
      message: "ProcessInvoiceIn was updated and closed successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error updating processInvoiceIn with id=" + req.params.id,
    });
  }
};

const deleteProcessInvoiceIn = async (req, res) => {
  try {
    const processInvoiceIn = await processInvoiceIn.findByIdAndRemove(
      req.params.id,
      {
        useFindAndModify: false,
      }
    );
    if (!processInvoiceIn) {
      return res.status(404).send({
        message: `Cannot delete processInvoiceIn with id=${req.params.id}. Maybe processInvoiceIn was not found!`,
      });
    }
    res.send({
      message: "ProcessInvoiceIn was deleted successfully!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Could not delete processInvoiceIn with id=" + req.params.id,
    });
  }
};

module.exports = {
  createProcessInvoiceIn,
  getAllProcessInvoiceIn,
  getProcessInvoiceInById,
  updateProcessInvoiceIn,
  updateAndCloseProcessInvoiceIn,
  deleteProcessInvoiceIn,
};
