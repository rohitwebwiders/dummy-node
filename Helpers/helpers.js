export const successMessage = (message, res, status, data = null) => {
    res.status(status).json({
        success: true,
        message: message,
        data: data
    });
}

export const errorMessage = (message, res, status, data = null) => {
    res.status(status).json({
        success: false,
        message: message,
        data: data
    });
}
