require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// Routes
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("E-Commerce Backend Running");
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch(err => {
    console.error("MongoDB Error:", err);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
