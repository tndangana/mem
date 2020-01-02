const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.create = async (req, res) => {


    if (!req.body.email && !req.body.username && !req.body.password) {
        return res.status(400).send({
            message: "User object can not be empty"
        });
    }

    //this method generates a hash password against password given by the user.The has is then consumed by the password saved to the database
    await bcrypt.hash(req.body.password, 10).then(async (hash) => {
        // Validate request
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            title: req.body.title,
            password: hash,
            dob: req.body.dob,
            mobile: req.body.mobile,
            isActive: req.body.isActive,
            account_type: req.body.account_type,
            email: req.body.email,
            userName: req.body.userName
        })
        // Save user in the database
        await user.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note."
                });
            });

    });


};

exports.findById = async (req, res) => {
    await User.findById(req.params.userId)
        .then(userData => {
            if (!userData) {
                return res.status(404).send({
                    message: "userData not found with id " + req.params.userId
                });
            }
            res.send(userData);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.userId
            });
        });
}



// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {

    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.deleteById = async (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
}

exports.updateById = async (req, res) => {
    await User.findById(req.params.userId, function (err, user) {
        if (err) {
            return res.status(500).json(err);
        }
        if (!user) {
            return res.status(404).json(err);
        }
            user.firstName = req.body.firstName || user.firstName,
            user.lastName = req.body.lastName || user.lastName,
            user.title = req.body.title || user.title,
            user.dob = req.body.dob || user.dob,
            user.mobile = req.body.mobile || user.mobile,
            user.isActive = req.body.isActive || user.isActive,
            user.account_type = req.body.account_type || user.account_type,
            user.email = req.body.email || user.email,
            user.userName = req.body.userName || user.userName

        user.save(function (err, result) {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(result);
        });
    });
}

exports.login = async (req, res) => {
    let getUser;
    await User.findOne({ userName: req.body.userName })
        .then(async user => {
            if (!user) {
                return res.status(404).json(user);
            }
            getUser = await user;
            console.log(`**********`, getUser)
            return bcrypt.compare(req.body.password, getUser.password);
        }).then(response => {
            console.log(`tapindaa`)
            if (!response) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            console.log(`>>>>>>`, response)
            let jwtToken = jwt.sign({
                username: getUser.username,
                userId: getUser._id
            }, process.env.SECRET_TOKEN_KEY, {
                expiresIn: "1h"
            });
            console.log(`jwt---->token`, jwtToken)
            res.status(200).json({
                token: jwtToken,
                expiresIn: 3600,
                msg: getUser
            });
        }).catch(err => {
            return res.status(401).json({
                message: "Authentications failed"
            });
        })
}

exports.updatePasswordById = async (req, res) => {
    await User.findById(req.params.userId, function (err, user){
        if (err) {
            return res.status(500).json(err);
        }
        if (!user) {
            return res.status(404).json(err);
        }
        user.password = req.body.password || user.password;
        user.save(function (err, result) {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(result);
        });
    })

}

