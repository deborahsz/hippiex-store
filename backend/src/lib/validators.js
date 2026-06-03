const AppError = require('./AppError');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NAME_MIN = 2;
const NAME_MAX = 80;
const PASSWORD_MIN = 6;
const PASSWORD_MAX = 100;

function assertString(value, field) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new AppError(`O campo "${field}" é obrigatório.`, 400);
  }
}

function validateName(nome) {
  assertString(nome, 'nome');
  const trimmed = nome.trim();

  if (trimmed.length < NAME_MIN || trimmed.length > NAME_MAX) {
    throw new AppError(
      `O nome deve ter entre ${NAME_MIN} e ${NAME_MAX} caracteres.`,
      400
    );
  }

  return trimmed;
}

function validateEmail(email) {
  assertString(email, 'email');
  const normalized = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(normalized)) {
    throw new AppError('Informe um email válido.', 400);
  }

  return normalized;
}

function validatePassword(senha) {
  if (typeof senha !== 'string' || senha.length === 0) {
    throw new AppError('O campo "senha" é obrigatório.', 400);
  }

  if (senha.length < PASSWORD_MIN || senha.length > PASSWORD_MAX) {
    throw new AppError(
      `A senha deve ter entre ${PASSWORD_MIN} e ${PASSWORD_MAX} caracteres.`,
      400
    );
  }

  return senha;
}

function validateProductId(produtoId) {
  const id = Number(produtoId);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError('Identificador de produto inválido.', 400);
  }

  return id;
}

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateProductId,
  EMAIL_REGEX,
};
