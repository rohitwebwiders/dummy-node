const userRegister = async (req, res) => {
    try {
        res.status(200).json({
            message: "User registration successfu",
            data: req.body
        });
    } catch (error) {
        console.error("Error in userRegister:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {userRegister};