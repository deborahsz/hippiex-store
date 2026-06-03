const jwt = require('jsonwebtoken');

const config = require('../config');
const AppError = require('../lib/AppError');

/**
 * Express middleware that validates the `Authorization: Bearer <token>`
 * header. On success it attaches `request.user = { id, nome, email }`.
 */
function authenticate(request, _response, next) {
  const header = request.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new AppError('Autenticação obrigatória.', 401);
  }

  try {
    const payload = jwt.verify(token, config.jwt.secret);
    request.user = {
      id: payload.sub,
      nome: payload.nome,
      email: payload.email,
    };
    return next();
  } catch (error) {
    throw new AppError('Sessão inválida ou expirada. Faça login novamente.', 401);
  }
}

function signToken(user) {
  return jwt.sign(
    { nome: user.nome, email: user.email },
    config.jwt.secret,
    { subject: String(user.id), expiresIn: config.jwt.expiresIn }
  );
}

module.exports = {
  authenticate,
  signToken,
};
