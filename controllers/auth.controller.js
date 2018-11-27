var UserService = require('../services/auth.service');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.createUser = async function (req, res, next) {

    // Req.Body contains the form submit values.

    var user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    try {

        // Calling the Service function with the new object from the Request Body

        var createdUser = await UserService.createUser(user);
        

        // create a token
        var token = jwt.sign({ id: createdUser._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        return res.status(200).json({ status: 200, data: createdUser, message: "Succesfully Created User", auth: true, token: token })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.
        console.log(e);
        return res.status(400).json({ status: 400, message: "User Creation was Unsuccesfull" })
    }
}


exports.getUser = async function (req, res, next) {

    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    var id = null;

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        //res.status(200).send(decoded);

        id = decoded.id;
        
    });

    try {

        //console.log(decoded.id);

        var objUser = await UserService.findUser({
            id: id
        });

        if (objUser)
            return res.status(200).json(objUser);
        else
            return res.status(404).json({ status: 404, message: "No user found." });

    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.validate = async function (req, res, next) {

    // Req.Body contains the form submit values.

    var user = {
        email: req.body.email,
        password: req.body.password
    }

    try {

        var objUser = await UserService.validate(user);

        if (objUser.status == 200) {

            var token = jwt.sign({ id: objUser.user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        }
        else {

            return res.status(401).send({ auth: false, token: null });
        }

    } catch (e) {

        console.log(e);
        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: "Login Unsuccesfull" })
    }
}