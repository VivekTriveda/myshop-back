const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/checkout", async (req, res) => {
   // checkout code
});

module.exports = router;