module.exports = function(err, req, res, next) {
  let statusCode = 500
  let errorCode = 'INTERNAL SERVER ERROR'
  let message = 'Internal Server Error'

  if(err.name == 'SequelizeValidationError') {
    statusCode = 400
    errorCode = 'VALIDATION_ERROR'
    const msg =[]
    for(let i = 0 ; i < err.errors.length; i++) {
      msg.push(err.errors[i].message)
    }
    message = msg.join(', ')
  } else if(err.name == 'ERROR_NOT_FOUND') {
    statusCode = 404
    errorCode = 'ERROR_NOT_FOUND'
    message = 'Error Not Found'
  }

  res.status(statusCode).json({errorCode, message})
}