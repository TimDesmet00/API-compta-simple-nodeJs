const express = require("express");
const router = express.Router();
const revenueJournalController = require("../Controllers/revenueJournal.controller");

router.post("/add", revenueJournalController.createRevenueJournal);
router.get("/getall", revenueJournalController.getAllRevenueJournal);
router.get("/getone/:date", revenueJournalController.getRevenueJournalByDate);
router.patch("/update/:date", revenueJournalController.updateRevenueJournal);
router.delete("/delete/:date", revenueJournalController.deleteRevenueJournal);

module.exports = router;
