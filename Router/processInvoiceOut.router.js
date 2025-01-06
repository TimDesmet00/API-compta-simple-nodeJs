const express = require("express");
const router = express.Router();
const processInvoiceOutController = require("../Controllers/processInvoiceOut.controller");

router.post("/add", processInvoiceOutController.createProcessInvoiceOut);
router.get("/getall", processInvoiceOutController.getAllProcessInvoiceOut);
router.get("/getone/:id", processInvoiceOutController.getProcessInvoiceOutById);
router.patch(
  "/update/:id",
  processInvoiceOutController.updateProcessInvoiceOut
);
router.patch(
  "/close/:id",
  processInvoiceOutController.updateAndCloseProcessInvoiceOut
);
router.delete(
  "/delete/:id",
  processInvoiceOutController.deleteProcessInvoiceOut
);

module.exports = router;
