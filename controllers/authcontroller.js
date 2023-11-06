const User = require('../models/userModel');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.loginpage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../FrontEnd/login.html'));
}
exports.home = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../FrontEnd/signup.html'));
}
exports.signup = async (req, res, next) => {
    console.log(req.body)
    try {
        const { name, email, password } = req.body;
        if (name.length === 0 || name == null || password == null || email == null || email.length === 0 || password.length === 0) {
            res.status(400).json({ err: "bad  parameters" })
        }
        const user = await User.findOne({ email });
        if (user) {
            res.status(403).json({ "failed": "user exists", error: 'user exists' })
        } else {
            console.log('>> in else')
            bcrypt.hash(password, 10, async (err, hash) => {
                const data = await new User({ name: name, email: email, password: hash })
                data.save()
                res.status(201).json({ message: 'signed up successfully' })
            })

        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": err });
    }


}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (password == null || email == null || email.length === 0 || password.length === 0) {
            res.status(400).json({ err: "bad  parameters" })
        }
        const user = await User.find({ email });

        if (user) {
            //const user = user[0];
            console.log(user[0].password)
            console.log(password)
            bcrypt.compare(password, user[0].password, async (err, response) => {
                if (response) {
                    console.log('in if')
                    const token = await jwt.sign({ id: user[0].id, ispremiumuser: user[0].ispremiumuser }, process.env.TOKEN_SECRET);
                    res.status(200).json({
                        message: 'Login successful',
                        user: { username: req.body.name },
                        token: token
                    });
                } else {
                    res.status(401).json({ msg: "bad credentials" });
                }
            })
        } else {
            console.log('users', user);
            res.status(404).json({ msg: "user not found" });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}