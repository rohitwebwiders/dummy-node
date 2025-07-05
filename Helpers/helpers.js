export const successMessage = (message, res, status, data = null) => {
    if (!message) {
        message = "Success";
    }
    res.status(status).json({
        success: true,
        message: message,
        data: data
    });
}

export const errorMessage = (message, res, status, data = null) => {
    if (!message) {
        message = "Failed";
    }
    res.status(status).json({
        success: false,
        message: message,
        data: data
    });
}
