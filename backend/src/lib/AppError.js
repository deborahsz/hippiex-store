/**
 * Operational error with an HTTP status code. Thrown by controllers/services
 * and translated into a JSON response by the global error handler.
 */
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

module.exports = AppError;
