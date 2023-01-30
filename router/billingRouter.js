const express = require("express");
const {
    addBill,
    billingList,
    updateBilling,
    deleteBilling,
} = require("../controller/billController");
const auth = require("../middleware/auth");

//create router

const router = express.Router();

router.post("/add-billing", auth, addBill);
router.get("/billing-list", auth, billingList);
router.put("/update-billing/:id", auth, updateBilling);
router.delete("/delete-billing/:id", auth, deleteBilling);

module.exports = router;
