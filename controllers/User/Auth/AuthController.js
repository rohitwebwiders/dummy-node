const db = require('../../../models/index');
const User = db.User;
const {successMessage, errorMessage} = require('../../../Helpers/helpers.js');
const { hashPassword, comparePassword } = require('../../../utils/passwordUtils.js');
const { generateToken } = require('../../../utils/jwtUtils.js');
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

/**
 * Handles user login.
 *
 * This function processes a user's login request by:
 * - Extracting email and password from the request body.
 * - Verifying the user exists in the database.
 *   - If the user does not exist, returns an error message.
 * - Checking the user's status to ensure it is active.
 *   - If not active, returns an error message.
 * - Comparing the provided password with the stored hashed password.
 *   - If the password is invalid, returns an error message.
 * - Generating a JWT token for the authenticated user.
 * - Returning a success message with the JWT token and user data.
 *
 * @param {Object} req - The request object containing user login data.
 * @param {Object} res - The response object to send back the appropriate response.
 */
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: {email: email}});
        if (!user) {
            return errorMessage("Invalid email or password", res, 400);
        }
        if (user.status !== 'active') {
            return errorMessage("User is not active please contact admin", res, 403);
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return errorMessage("Invalid email or password", res, 400);
        }
        // Generate a JWT token for the user
        const token = generateToken({ id: user.id, email: user.email });
        console.log("Generated token:", token);
        return successMessage("User logged in successfully", res, 200, { token: token, user: user });  
    } catch (error) {
        console.error("Error in userLogin:", error);
        return errorMessage("Internal Server Error", res, 500);
    }
}

module.exports = {userRegister, userLogin};