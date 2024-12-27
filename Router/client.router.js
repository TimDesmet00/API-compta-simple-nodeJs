const express = require("express");
const router = express.Router();
const clientController = require("../Controllers/client.controller");

router.post("/add", clientController.createClient);
router.get("/getall", clientController.getAllClients);
router.get("/getone/:id", clientController.getClientById);
router.patch("/update/:id", clientController.updateClient);
router.delete("/delete/:id", clientController.deleteClient);

module.exports = router;
