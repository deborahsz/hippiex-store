const AppError = require('../lib/AppError');
const config = require('../config');

function notFound(_request, response) {
  return response.status(404).json({ message: 'Recurso não encontrado.' });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, _request, response, _next) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error.type === 'entity.parse.failed') {
    return response.status(400).json({ message: 'JSON inválido no corpo da requisição.' });
  }

  // eslint-disable-next-line no-console
  console.error('[error]', error);

  return response.status(500).json({
    message: 'Erro interno do servidor.',
    ...(config.isProduction ? {} : { detail: error.message }),
  });
}

module.exports = {
  notFound,
  errorHandler,
};
