const supplier = require("../Models/supplier.model.js");
const validator = require("validator");

const createSupplier = async (req, res) => {
  // vérifier que la requête n'est pas vide
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Valider l'email
  if (req.body.email && !validator.isEmail(req.body.email)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid email format",
    });
  }
  try {
    // vérifier si le fournisseur existe déjà
    const existingSupplier = await supplier.findOne({ email: req.body.email });
    if (existingSupplier) {
      return res.status(400).json({
        status: "fail",
        message: "Supplier already exists",
      });
    }
    // Créer un nouveau fournisseur
    const supplier = await supplier.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        supplier,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message:
        error.message || "An error occurred while creating the supplier.",
    });
  }
};

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await supplier.find();
    res.status(200).json({
      status: "success",
      results: suppliers.length,
      data: {
        suppliers,
      },
    });
  } catch (error) {
    console.error("Error retrieving suppliers", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "An error occurred while retrieving suppliers.",
    });
  }
};

const getSupplierById = async (req, res) => {
  try {
    const supplier = await supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({
        status: "fail",
        message: "Supplier not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        supplier,
      },
    });
  } catch (error) {
    console.error("Error retrieving supplier", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "An error occurred while retrieving supplier.",
    });
  }
};

const updateSupplier = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        status: "fail",
        message: "Data to update can not be empty!",
      });
    }
    const id = req.params.id;
    const supplier = await supplier.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (!supplier) {
      return res.status(404).json({
        status: "fail",
        message: `Cannot update Supplier with id=${id}. Maybe Supplier was not found!`,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Supplier was updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message || `Error updating Supplier with id=${id}`,
    });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const id = req.params.id;
    const supplier = await supplier.findByIdAndDelete(id);
    if (!supplier) {
      return res.status(404).json({
        status: "fail",
        message: `Cannot delete Supplier with id=${id}. Maybe Supplier was not found!`,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Supplier was deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message || `Could not delete Supplier with id=${id}`,
    });
  }
};

module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
