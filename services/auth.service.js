var User = require('../models/user.model');
var bcrypt = require('bcryptjs');


exports.createUser = async function (user) {

    var hashedPassword = bcrypt.hashSync(user.password, 8);

    // Creating a new Mongoose Object by using the new keyword
    var newUser = new User({
        name: user.name,
        email: user.email,
        password: hashedPassword
    })

    try {

        // Saving the User 
        var savedUser = await newUser.save()

        return savedUser;
    } catch (e) {

        // return a Error message describing the reason     
        throw Error("Error while Creating User")
    }
}


exports.findUser = async function (user) {
    var id = user.id

    try {
        //Find the old Todo Object by the Id

        var objUser = await User.findById(id, { password: 0 });

        //console.log("Service User " + objUser);

        return objUser;
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
}


exports.validate = async function (params) {

    try {
        var objUser = await User.findOne({ email: params.email });
        console.log(objUser);
        var status = 200;
        var message = "";

        if (!objUser) {
            status = 404;
            message = "No user found."
        }

        var passwordIsValid = bcrypt.compareSync(params.password, objUser.password);

        if (!passwordIsValid) {
            status = 401;
            message = "Incorrect Password."
        }

        return { status: status, user: objUser };
    }

    catch (e) {
        console.log(e);
        throw Error("Error occured while Finding the User");
    }
    //, function (err, user) {

    //    var status = 200;
    //    var message = "";

    //    if (err) {
    //        status = 500;
    //        message = "Error on the server.";
    //    }

    //    if (!user) {
    //        status = 404;
    //        message = "No user found."
    //    }

    //    var passwordIsValid = bcrypt.compareSync(params.password, user.password);

    //    if (!passwordIsValid) {
    //        status = 401;
    //        message = "Incorrect Password."
    //    }

    //    return { status = status, user = user };

    //}
}