const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

router.post("/", async (req, res) => {

    const { name, feedback } = req.body;

    const newFeedback = new Feedback({
        name,
        feedback
    });

    await newFeedback.save();

    res.json({
        message: "Feedback Saved Successfully"
    });
});

module.exports = router;