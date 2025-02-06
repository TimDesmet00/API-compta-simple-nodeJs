const express = require("express");
const router = express.Router();
const factureController = require("../Controllers/facture.controller");

router.post("/add", factureController.createFacture);
router.get("/getall", factureController.getAllFactures);
router.get("/getone/:id", factureController.getFactureById);
router.get("/getbyclient/:id", factureController.getFactureByClient);
router.get("/getbyuser/:id", factureController.getFactureByUser);
router.patch("/update/:id", factureController.updateFacture);
router.delete("/delete/:id", factureController.deleteFacture);

module.exports = router;
