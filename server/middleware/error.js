const errorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
    let error = { ...err }

    //console.log(err)
    error.message = err.message

    if (err.code === 11000) {
        const message = `Duplicate Field value`
        error = new errorResponse(message, 400)
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => (val))
        error = new errorResponse(message, 400)
    }


    res.status(error.statusCode || 500).json({
        sucess: true,
        error: error.message || 'server error'
    })
}

module.exports = errorHandler