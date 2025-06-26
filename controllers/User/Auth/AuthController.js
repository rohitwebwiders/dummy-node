const sequelize = require('../../../config/db');
const db = require('../../../models/index');
const User = db.User;
const {successMessage, errorMessage} = require('../../../Helpers/helpers.js');
const userRegister = async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await sequelize.sync({ force: false});
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password        
        };
        const userData = await User.create(newUser);
        successMessage("User registered successfully", res, 201, userData);
        //res.status(201).json({ message: "User registered successfully", data: userData });
    } catch (error) {
        console.error("Error in userRegister:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {userRegister};