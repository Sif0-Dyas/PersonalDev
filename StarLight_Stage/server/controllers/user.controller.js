const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config();


module.exports.register = (req, res) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
            res
                .cookie("usertoken", userToken, { httpOnly: true })
                .json({ msg: "success", user: { _id: user._id, email: user.email } });
        })
        .catch(err => {
            console.log("Error message:", err.message);
            res.status(400).json(err);
        });
};

module.exports.index = (req, res) => {
    User.find()
        .then(users => res.cookie("test", "test", { httpOnly: true }).json(users))
        .catch(err => res.status(400).json(err))
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        return res.sendStatus(400);
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) {
        return res.sendStatus(400);
    }

    const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res
        .cookie("usertoken", userToken, { httpOnly: true })
        .json({ msg: "success!", user: { _id: user._id, email: user.email } });
};

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken')
    res.sendStatus(200)
}

module.exports.getUser = (req, res) => {
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true })
    User.findOne({ _id: decodedJwt.payload.id })
        .then(oneUser => res.json(oneUser))
        .catch(err => res.status(500).json(err))
}

module.exports.cookie = (req, res) => {
    res
        .cookie("testkey", "testvalue", { httpOnly: true })
        .json("success")
}

module.exports.uploadImage = async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (!user) {
        return res.status(400).send('User not found');
    }
    user.imagePaths.push(req.file.path);
    await user.save();
    res.send('File uploaded successfully');
};
