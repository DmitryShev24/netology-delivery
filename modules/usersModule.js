const User = require('../models/user');
const bcrypt = require("bcrypt");

class Users {

    static create = async function(data) {
        const {email, password, name, contactPhone} = data; //Get fields from data object

        if (email && password && name) { //Check, if necessary data is available

            const emailIsOccupied = await Users.findByEmail(email); //Check, if email is occupied

            if (!emailIsOccupied) {
                const salt = bcrypt.genSaltSync(10);    //First hash the password before user creation
                const passwordHash = bcrypt.hashSync(password, salt);

                const newUser = new User({email, passwordHash, name, contactPhone}); //Create new user

                //Save user to the DB
                try {
                    return await newUser.save();
                } catch(e) {
                    console.log('Error: user saving DB error.');
                    return null;
                }
            } else {
                return null;
            }
        }
    }

    static findByEmail = async function(email) {
        //Finding, if a user with entered email already exist
        try {
            const userExists = await User.find({email: email}).exec();
            console.log(userExists);

            if (userExists.length !== 0) {
                console.log(userExists);
                return userExists;
            } else {
                return null;
            }
        } catch (e) {
            console.log(`Database Error: Can't find a user`);
        }
    }
}

module.exports = Users;