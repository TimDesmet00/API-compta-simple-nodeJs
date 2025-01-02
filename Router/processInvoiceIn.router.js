const express = require("express");
const router = express.Router();
const processInvoiceInController = require("../Controllers/processInvoiceIn.controller");

router.post("/add", processInvoiceInController.createProcessInvoiceIn);
router.get("/getall", processInvoiceInController.getAllProcessInvoiceIn);
router.get("/getone/:id", processInvoiceInController.getProcessInvoiceInById);
router.patch("/update/:id", processInvoiceInController.updateProcessInvoiceIn);
router.patch(
  "/close/:id",
  processInvoiceInController.updateAndCloseProcessInvoiceIn
);
router.delete("/delete/:id", processInvoiceInController.deleteProcessInvoiceIn);

module.exports = router;
