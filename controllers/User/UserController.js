const model = require('../../models/index.js');
const User = model.User;
const {successMessage, errorMessage } = require("../../Helpers/helpers.js");


/**
 * Retrieves the user profile from the database.
 *
 * This function takes a request and response object as arguments.
 * It extracts the user id from the request object and uses it to
 * fetch the corresponding user profile from the database.
 * If the profile is found, it returns a success message with the
 * profile data. If the profile is not found, it returns an error
 * message with a 500 status code.
 * @param {Object} req - The request object containing the user id.
 * @param {Object} res - The response object to send the appropriate response.
 * @returns {Object} - A promise that resolves to a success or error message.
 */
const getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        const userData = await User.findOne({ where: { id: user.id }});
        return successMessage("User profile retrieved successfully", res, 200, userData);
    } catch (error) {
        console.log(error);
        return errorMessage(error.message, res, 500);
    }
}

module.exports = {getUserProfile};