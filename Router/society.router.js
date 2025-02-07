const express = require("express");
const router = express.Router();
const societyController = require("../Controllers/society.controller");

router.post("/add", societyController.createSociety);
router.get("/getall", societyController.getAllSocieties);
router.get("/getone/:id", societyController.getSocietyById);
router.patch("/update/:id", societyController.updateSociety);
router.delete("/delete/:id", societyController.deleteSociety);

module.exports = router;
