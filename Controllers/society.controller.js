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
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({
        status: "fail",
        message: "Please enter a valid email address",
      });
    }
    // vérifier si la société existe déjà
    const existingSocietyByName = await society.findone({
      name: req.body.name,
    });
    const existingSocietyByEmail = await society.findone({
      email: req.body.email,
    });
    const existingSocietyByVat = await society.findone({ vat: req.body.vat });
    if (
      existingSocietyByName ||
      existingSocietyByEmail ||
      existingSocietyByVat
    ) {
      return res.status(400).json({
        status: "fail",
        message: "A society already exists",
      });
    }
    const society = await society.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        society,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message || "An error occurred while creating the society.",
    });
  }
};
