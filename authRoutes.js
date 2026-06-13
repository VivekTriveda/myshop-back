const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

// In-Memory Storage
let users = [];
let orders = [];
let feedbacks = [];

/* ===========================
   REGISTER
=========================== */

router.post("/register", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                success: false,
                message: "Username must be alphanumeric"
            });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message:
                "Password must contain uppercase, lowercase, number and special character"
            });
        }

        const existingUser = users.find(
            u => u.username.toLowerCase() === username.toLowerCase()
        );

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        const existingEmail = users.find(
            u => u.email.toLowerCase() === email.toLowerCase()
        );

        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword =
        await bcrypt.hash(password, 10);

        const user = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword
        };

        users.push(user);

        res.status(201).json({
            success: true,
            message: "Registration Successful"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

/* ===========================
   LOGIN
=========================== */

router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = users.find(
            u => u.username === username
        );

        if (!user) {

            return res.status(400).json({
                success: false,
                message: "Invalid Username"
            });

        }

        const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });

        }

        res.json({
            success: true,
            message: "Login Successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

/* ===========================
   GET ALL USERS
=========================== */

router.get("/users", (req, res) => {

    res.json(users);

});

/* ===========================
   DELETE USER
=========================== */

router.delete("/users/:id", (req, res) => {

    const userId = parseInt(req.params.id);

    users = users.filter(
        user => user.id !== userId
    );

    res.json({
        success: true,
        message: "User Deleted"
    });

});

/* ===========================
   PLACE ORDER
=========================== */

router.post("/place-order", (req, res) => {

    const order = {
        id: orders.length + 1,
        ...req.body
    };

    orders.push(order);

    res.json({
        success: true,
        orderId: order.id
    });

});

/* ===========================
   GET ORDERS
=========================== */

router.get("/orders", (req, res) => {

    res.json(orders);

});

/* ===========================
   FEEDBACK
=========================== */

router.post("/feedback", (req, res) => {

    const feedback = {
        id: feedbacks.length + 1,
        ...req.body
    };

    feedbacks.push(feedback);

    res.json({
        success: true,
        message: "Feedback Saved Successfully"
    });

});

router.get("/check-feedback/:userId", (req, res) => {

    const feedback = feedbacks.find(
        f => f.userId == req.params.userId
    );

    res.json({
        submitted: !!feedback
    });

});

module.exports = router;