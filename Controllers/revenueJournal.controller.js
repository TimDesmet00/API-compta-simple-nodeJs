const RevenueJournal = require("../Models/revenueJournal.model.js");

const createRevenueJournal = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  try {
    const existingEntry = await RevenueJournal.findOne({ date: req.body.date });
    if (existingEntry) {
      return res.status(400).json({
        status: "fail",
        message: "An entry with this date already exists",
      });
    }
    const revenueJournal = await RevenueJournal.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        revenueJournal,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message:
        error.message ||
        "An error occurred while creating the revenue journal.",
    });
  }
};

const getAllRevenueJournal = async (req, res) => {
  try {
    const revenueJournal = await RevenueJournal.find();
    res.status(200).json({
      status: "success",
      results: revenueJournal.length,
      data: {
        revenueJournal,
      },
    });
  } catch (error) {
    console.error("Error retrieving revenue journal", error);
    res.status(500).json({
      status: "fail",
      message:
        error.message || "An error occurred while retrieving revenue journal.",
    });
  }
};

const getRevenueJournalByDate = async (req, res) => {
  try {
    const revenueJournal = await RevenueJournal.findOne({
      date: req.params.date,
    });
    if (!revenueJournal) {
      return res.status(404).json({
        status: "fail",
        message: "Revenue journal not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        revenueJournal,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message:
        error.message ||
        "An error occurred while retrieving the revenue journal.",
    });
  }
};

const updateRevenueJournal = async (req, res) => {
  try {
    const revenueJournal = await RevenueJournal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!revenueJournal) {
      return res.status(404).json({
        status: "fail",
        message: "Revenue journal not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        revenueJournal,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message:
        error.message ||
        "An error occurred while updating the revenue journal.",
    });
  }
};

const deleteRevenueJournal = async (req, res) => {
  try {
    const revenueJournal = await RevenueJournal.findByIdAndDelete(
      req.params.id
    );
    if (!revenueJournal) {
      return res.status(404).json({
        status: "fail",
        message: "Revenue journal not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message:
        error.message ||
        "An error occurred while deleting the revenue journal.",
    });
  }
};

module.exports = {
  createRevenueJournal,
  getAllRevenueJournal,
  getRevenueJournalByDate,
  updateRevenueJournal,
  deleteRevenueJournal,
};
