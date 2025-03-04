const society = require("../Models/society.model.js");
const validator = require("validator");
const facture = require("../Models/facture.model.js");

const createSociety = async (req, res) => {
  // vérifier que la requête n'est pas vide
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  try {
    // console.log(req.body);

    if (!validator.isEmail(req.body.email)) {
      console.log("Invalid email format");
      return res.status(400).json({
        status: "fail",
        message: "Please enter a valid email address",
      });
    }
    // vérifier si la société existe déjà
    const existingSocietyByName = await society.findOne({
      name: req.body.name,
    });
    // console.log("existing society by name", existingSocietyByName);

    const existingSocietyByEmail = await society.findOne({
      email: req.body.email,
    });
    // console.log("existing society by email", existingSocietyByEmail);

    const existingSocietyByVat = await society.findOne({ vat: req.body.vat });
    console.log("existing society by vat", existingSocietyByVat);

    if (
      existingSocietyByName ||
      existingSocietyByEmail ||
      existingSocietyByVat
    ) {
      // console.log("A society already exists");

      return res.status(400).json({
        status: "fail",
        message: "A society already exists",
      });
    }
    const newSociety = await society.create(req.body);
    console.log("Society created", newSociety);
    res.status(201).json({
      status: "success",
      data: {
        society: newSociety,
      },
    });
  } catch (error) {
    // console.error("Error creating society", error);
    res.status(400).json({
      status: "fail",
      message: error.message || "An error occurred while creating the society.",
    });
  }
};

const getAllSocieties = async (req, res) => {
  try {
    const societies = await society.find().populate("factures");
    res.status(200).json({
      status: "success",
      results: societies.length,
      data: {
        societies,
      },
    });
  } catch (error) {
    console.error("Error retrieving societies", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "An error occurred while retrieving societies.",
    });
  }
};

const getSocietyById = async (req, res) => {
  try {
    const society = await society.findById(req.params.id).populate("factures");
    if (!society) {
      return res.status(404).json({
        status: "fail",
        message: "Society not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        society,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message:
        error.message || "An error occurred while retrieving the society.",
    });
  }
};

const updateSociety = async (req, res) => {
  try {
    const society = await society
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      .populate("factures");
    if (!society) {
      return res.status(404).json({
        status: "fail",
        message: "Society not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        society,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message || "An error occurred while updating the society.",
    });
  }
};

const deleteSociety = async (req, res) => {
  try {
    const society = await society.findByIdAndDelete(req.params.id);
    if (!society) {
      return res.status(404).json({
        status: "fail",
        message: "Society not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message || "An error occurred while deleting the society.",
    });
  }
};

module.exports = {
  createSociety,
  getAllSocieties,
  getSocietyById,
  updateSociety,
  deleteSociety,
};
