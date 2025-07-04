
import bcrypt from 'bcrypt';

/**
 * Hashes a plain text password using bcrypt.
 *
 * This function takes a plain text password and hashes it with a specified
 * number of salt rounds for added security. The result is a hashed password
 * that can be stored securely.
 *
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */
export const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

/**
 * Compares a plain text password with a hashed password.
 *
 * This function takes a plain text password and a hashed password,
 * and uses bcrypt to compare them for a match.
 *
 * @param {string} password - The plain text password to be compared.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, false otherwise.
 */
export const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}