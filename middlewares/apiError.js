function apiNotFound (req, res, next) {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

function apiErrorHandler (err, req, res, next) {
    res.status(500).json({
        message: "An error occured.",
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

export { apiNotFound, apiErrorHandler }