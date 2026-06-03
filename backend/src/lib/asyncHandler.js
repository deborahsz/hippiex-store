/**
 * Wraps an async route handler so any rejected promise is forwarded to
 * Express's error-handling middleware instead of crashing the process or
 * hanging the request.
 */
module.exports = function asyncHandler(handler) {
  return function wrappedHandler(request, response, next) {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
};
