const db = require('../../../models/index');
const User = db.User;
const {successMessage, errorMessage} = require('../../../Helpers/helpers.js');
const { hashPassword } = require('../../../utils/passwordUtils.js');
/**
 * Registers a new user.
 * 
 * This function handles the registration of a new user by:
 * - Authenticating and synchronizing the sequelize connection.
 * - Extracting user details (name, email, password) from the request body.
 * - Checking if a user with the provided email already exists.
 *   - If so, returns an error message.
 * - Creating a new user record in the database.
 * - Returning a success message with the created user's data.
 * 
 * @param {Object} req - The request object containing user registration data.
 * @param {Object} res - The response object to send back the appropriate response.
 */
const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email: email}});
        if (existingUser) {
            return errorMessage("User already exists", res, 400);
        }
        const passwordHashed = await hashPassword(password);
        const newUser = {
            name: name,
            email: email,
            password: passwordHashed,
            user_type: 'user', // Default user type         
        };
        const userData = await User.create(newUser);
        return successMessage("User registered successfully", res, 201, userData);
        //res.status(201).json({ message: "User registered successfully", data: userData });
    } catch (error) {
        console.error("Error in userRegister:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        await sequelize.authenticate();

    } catch (error) {
        console.error("Error in userLogin:", error);
        return errorMessage("Internal Server Error", res, 500);
    }
}

module.exports = {userRegister, userLogin};