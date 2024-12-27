const Client = require("../Models/client.model.js");
const Facture = require("../Models/facture.model.js");

// Create and Save a new Client

exports.createClient = async (req, res) => {
  // vérifier que la requête n'est pas vide
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  try {
    // vérifier si le client existe déjà
    const existingClient = await Client.findOne({ email: req.body.email });
    if (existingClient) {
      return res.status(400).json({
        status: "fail",
        message: "Client already exists",
      });
    }
    // Créer un nouveau client
    const client = await Client.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        client,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message || "An error occurred while creating the client.",
    });
  }
};
