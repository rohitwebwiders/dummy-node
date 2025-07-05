const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const { errorMessage } = require("../Helpers/helpers.js");

/**
 * Middleware to authenticate JWT token from request headers.
 *
 * This function checks for the presence of an 'authorization' header in the request.
 * If the header is missing, it returns an error message indicating that the access token is missing.
 * It then extracts the token from the authorization header and verifies it using the SECRET_KEY.
 * If the token is valid, the user information is attached to the request object and proceeds to the next middleware.
 * If the token is invalid, it returns an error message indicating an invalid token.
 *
 * @param {Object} req - The request object containing HTTP request data.
 * @param {Object} res - The response object to send back the appropriate response.
 * @param {Function} next - The next middleware function in the stack.
 */
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return errorMessage("Access token is missing", res, 401);
    }

    const token = authHeader.split(' ')[1]; // ✅ Fix here\
    try {
        console.log("Secret key:", SECRET_KEY);
        const user = jwt.verify(token, SECRET_KEY);
        req.user = user; // attach decoded payload to request
        next();
    } catch (error) {
        return errorMessage("Invalid token", res, 403);
    }
};

module.exports = { authenticateToken };