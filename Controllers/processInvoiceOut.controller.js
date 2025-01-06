const ProcessInvoiceOut = require("../models/processInvoiceOut.model.js");
const Supplier = require("../models/supplier.model.js");

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

const getAllProcessInvoiceOut = async (req, res) => {
  try {
    const processInvoiceOut = await ProcessInvoiceOut.find().populate(
      "supplier"
    );
    res.status(200).json({
      status: "success",
      results: processInvoiceOut.length,
      data: {
        processInvoiceOut,
      },
    });
  } catch (error) {
    console.error("Error retrieving processInvoiceOut", error);
    res.status(500).json({
      status: "fail",
      message:
        error.message ||
        "An error occurred while retrieving processInvoiceOut.",
    });
  }
};

const getProcessInvoiceOutById = async (req, res) => {
  try {
    const processInvoiceOut = await ProcessInvoiceOut.findById(
      req.params.id
    ).populate("supplier");
    if (!processInvoiceOut) {
      return res.status(404).json({
        status: "fail",
        message: "No processInvoiceOut found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        processInvoiceOut,
      },
    });
  } catch (error) {
    console.error("Error retrieving processInvoiceOut", error);
    res.status(500).json({
      status: "fail",
      message:
        error.message ||
        "An error occurred while retrieving processInvoiceOut.",
    });
  }
};

const updateProcessInvoiceOut = async (req, res) => {
  try {
    const processInvoiceOutclosed = await ProcessInvoiceOut.findById(
      req.params.id
    );
    if (existingProcessInvoiceOut.closed) {
      return res.status(400).send({
        message: "Cannot update a closed processInvoiceIn.",
      });
    }

    const processInvoiceOut = await ProcessInvoiceOut.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!processInvoiceOut) {
      return res.status(404).json({
        status: "fail",
        message: "No processInvoiceOut found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        processInvoiceOut,
      },
    });
  } catch (error) {
    console.error("Error updating processInvoiceOut", error);
    res.status(500).json({
      status: "fail",
      message:
        error.message || "An error occurred while updating processInvoiceOut.",
    });
  }
};

const updateAndCloseProcessInvoiceOut = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  try {
    const processInvoiceOut = await ProcessInvoiceOut.findByIdAndUpdate(
      req.params.id,
      { closed: true },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!processInvoiceOut) {
      return res.status(404).json({
        status: "fail",
        message: "No processInvoiceOut found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        processInvoiceOut,
      },
    });
  } catch (error) {
    console.error("Error updating processInvoiceOut", error);
    res.status(500).json({
      status: "fail",
      message:
        error.message || "An error occurred while updating processInvoiceOut.",
    });
  }
};

const deleteProcessInvoiceOut = async (req, res) => {
  try {
    const processInvoiceOut = await ProcessInvoiceOut.findByIdAndDelete(
      req.params.id
    );
    if (!processInvoiceOut) {
      return res.status(404).json({
        status: "fail",
        message: "No processInvoiceOut found with that ID",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting processInvoiceOut", error);
    res.status(500).json({
      status: "fail",
      message:
        error.message || "An error occurred while deleting processInvoiceOut.",
    });
  }
};

module.exports = {
  createProcessInvoiceOut,
  getAllProcessInvoiceOut,
  getProcessInvoiceOutById,
  updateProcessInvoiceOut,
  updateAndCloseProcessInvoiceOut,
  deleteProcessInvoiceOut,
};
