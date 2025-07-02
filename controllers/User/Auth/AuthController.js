const sequelize = require('../../../config/db');
const db = require('../../../models/index');
const User = db.User;
const {successMessage, errorMessage} = require('../../../Helpers/helpers.js');
const userRegister = async (req, res) => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false});
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email: email}});
        if (existingUser) {
            return errorMessage("User already exists", res, 400);
        }
        const newUser = {
            name: name,
            email: email,
            password: password        
        };
        const userData = await User.create(newUser);
        return successMessage("User registered successfully", res, 201, userData);
        //res.status(201).json({ message: "User registered successfully", data: userData });
    } catch (error) {
        console.error("Error in userRegister:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {userRegister};