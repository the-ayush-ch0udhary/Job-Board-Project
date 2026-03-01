const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {

    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed
    });

    await user.save();

    res.json("User registered");

});

router.post("/login", async (req, res) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.send("User not found");

    res.json(user);

});

module.exports = router;