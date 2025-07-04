import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Generates a JWT token from the given payload.
 *
 * @param {Object} payload - The object to be signed and encoded into a JWT token.
 * @param {string} [expiresIn=1h] - The expiration time of the token in ms, seconds, minutes, hours, or days.
 * @returns {string} - A JWT token string.
 * @throws {Error} - If there is an error generating the token.
 */
export const generateToken = (payload, expiresIn = "1h") => {
    try {
        return jwt.sign(payload, SECRET_KEY, { expiresIn });
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error(error.message || "Failed to generate token");   
    }
} 

/**
 * Verifies the given JWT token string.
 *
 * @param {string} token - The JWT token string to be verified.
 * @returns {Object} - The decoded payload if the token is valid.
 * @throws {Error} - If there is an error verifying the token, such as expiration or invalid signature.
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error("Error verifying token:", error);
        throw new Error(error.message || "Failed to verify token");
    }
}