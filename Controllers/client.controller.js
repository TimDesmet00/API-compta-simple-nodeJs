const Client = require("../Models/client.model.js");
const Facture = require("../Models/facture.model.js");
const validator = require("validator");

const createClient = async (req, res) => {
  console.log(req.body);
  // vérifier que la requête n'est pas vide
  if (!req.body) {
    // console.log("Content can not be empty!");
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Valider l'email
  if (req.body.email && !validator.isEmail(req.body.email)) {
    // console.log("Invalid email format");
    return res.status(400).json({
      status: "fail",
      message: "Invalid email format",
    });
  }
  try {
    // vérifier si le client existe déjà
    const existingClient = await Client.findOne({ email: req.body.email });
    if (existingClient) {
      // console.log("client already exists");
      return res.status(400).json({
        status: "fail",
        message: "Client already exists",
      });
    }
    // Créer un nouveau client
    const client = await Client.create(req.body);
    console.log("success");
    res.status(201).json({
      status: "success",
      data: {
        client,
      },
    });
  } catch (error) {
    // console.log("An error occurred while creating the client.", error);
    res.status(400).json({
      status: "fail",
      message: error.message || "An error occurred while creating the client.",
    });
  }
};

const getAllClients = async (req, res) => {
  try {
    // console.log("getAllClients is played");
    const clients = await Client.find().populate("invoices");
    // console.log("clients", clients);
    res.setHeader("Content-Type", "application/json");
    // console.log("Content-Type:", res.getHeader("Content-Type"));
    res.status(200).json({
      status: "success",
      results: clients.length,
      data: {
        clients,
      },
    });
  } catch (error) {
    // console.error("Error retrieving clients", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "An error occurred while retrieving clients.",
    });
  }
};

const getClientById = async (req, res) => {
  console.log("getClientById is played");
  console.log("req.params.id", req.params.id);
  try {
    const client = await Client.findById(req.params.id).populate("invoices");
    console.log("client", client);
    res.status(200).json({
      status: "success",
      data: {
        client,
      },
    });
  } catch (error) {
    console.error("Error retrieving client", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "An error occurred while retrieving client.",
    });
  }
};

const updateClient = async (req, res) => {
  try {
    // vérifier que la requête n'est pas vide
    if (req.body.email && !validator.isEmail(req.body.email)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email format",
      });
    }
    // vérifier si le client existe déjà
    const existingClient = await Client.findById(req.params.id);
    if (!existingClient) {
      return res.status(404).json({
        status: "fail",
        message: "Client not found",
      });
    }
    // Mettre à jour le client
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        client,
      },
    });
  } catch (error) {
    // console.error("Error updating client", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "An error occurred while updating client.",
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    // vérifier si le client existe déjà
    const existingClient = await Client.findById(req.params.id);
    if (!existingClient) {
      return res.status(404).json({
        status: "fail",
        message: "Client not found",
      });
    }
    // Supprimer le client
    await Client.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    // console.error("Error deleting client", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "An error occurred while deleting client.",
    });
  }
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
