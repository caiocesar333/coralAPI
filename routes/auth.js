const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,
            "compasso")
            .toString()
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            username:req.body.username
        });
        !user && res.status(401).json("Wrong User name");

        const hashPassword = CryptoJS.AES.decrypt(user.password, "compasso");
        const Originalpassword = hashPassword.toString(CryptoJS.enc.Utf8);
        Originalpassword !== req.body.password && res.status(401).json("Wrong Password");

        const acessToken = jwt.sign({
            id:user._id, isAdmin: user.isAdmin
        }, "Compasso", {expiresIn:"3d"})

        const {password, ...others} = user._doc;

        res.status(200).json({...others, acessToken})
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;