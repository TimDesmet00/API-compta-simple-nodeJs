const facture = require("../Models/facture.model.js");
const client = require("../Models/client.model.js");
const society = require("../Models/society.model.js");
const validator = require("validator");

const createFacture = async (req, res) => {
  // vérifier que la requête n'est pas vide
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  try {
    const facture = await facture.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        facture,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message || "An error occurred while creating the facture.",
    });
  }
};

const getAllFactures = async (req, res) => {
  try {
    const factures = await facture
      .find()
      .populate("client")
      .populate("society");
    res.status(200).json({
      status: "success",
      results: factures.length,
      data: {
        factures,
      },
    });
  } catch (error) {
    console.error("Error retrieving factures", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "An error occurred while retrieving factures.",
    });
  }
};

const getFactureById = async (req, res) => {
  try {
    const facture = await facture
      .findById(req.params.id)
      .populate("client")
      .populate("society");
    if (!facture) {
      return res.status(404).json({
        status: "fail",
        message: "Facture not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        facture,
      },
    });
  } catch (error) {
    console.error("Error retrieving facture", error);
    res.status(500).json({
      status: "fail",
      message:
        error.message || "An error occurred while retrieving the facture.",
    });
  }
};

const getFactureByClient = async (req, res) => {
  try {
    const existingClient = await client.findById(req.params.id);
    if (!existingClient) {
      return res.status(404).json({
        status: "fail",
        message: "Client not found",
      });
    }
    const factures = await facture
      .find({ client: req.params.id })
      .populate("client")
      .populate("society");
    res.status(200).json({
      status: "success",
      data: {
        factures,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message:
        error.message || "An error occurred while retrieving the factures.",
    });
  }
};

const getFactureBySociety = async (req, res) => {
  try {
    const existingsociety = await society.findById(req.params.id);
    if (!existingsociety) {
      return res.status(404).json({
        status: "fail",
        message: "society not found",
      });
    }
    const factures = await facture
      .find({ society: req.params.id })
      .populate("client")
      .populate("society");
    res.status(200).json({
      status: "success",
      data: {
        factures,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message:
        error.message || "An error occurred while retrieving the factures.",
    });
  }
};

const updateFacture = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const existingFacture = await facture.findById(req.params.id);
  if (!existingFacture) {
    return res.status(404).json({
      status: "fail",
      message: "Facture not found",
    });
  }
  try {
    const updatedFacture = await facture.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        updatedFacture,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message || "An error occurred while updating the facture.",
    });
  }
};

const deleteFacture = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to delete can not be empty!",
    });
  }
  const existingFacture = await facture.findById(req.params.id);
  if (!existingFacture) {
    return res.status(404).json({
      status: "fail",
      message: "Facture not found",
    });
  }
  try {
    await facture.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message || "An error occurred while deleting the facture.",
    });
  }
};

module.exports = {
  createFacture,
  getAllFactures,
  getFactureById,
  getFactureByClient,
  getFactureBySociety,
  updateFacture,
  deleteFacture,
};
