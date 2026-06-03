const bcrypt = require('bcryptjs');

const config = require('../config');
const store = require('../lib/jsonStore');
const AppError = require('../lib/AppError');
const { signToken } = require('../middlewares/auth');
const {
  validateName,
  validateEmail,
  validatePassword,
} = require('../lib/validators');

const usersPath = store.resolveDataPath('users.json');

function nextId(items) {
  return items.reduce((max, item) => Math.max(max, item.id || 0), 0) + 1;
}

function publicUser(user) {
  const { senha: _senha, ...rest } = user;
  return rest;
}

async function register(request, response) {
  const nome = validateName(request.body.nome);
  const email = validateEmail(request.body.email);
  const senha = validatePassword(request.body.senha);

  const senhaHash = await bcrypt.hash(senha, config.bcryptRounds);

  const user = await store.update(usersPath, (users) => {
    if (users.some((item) => item.email === email)) {
      throw new AppError('Já existe uma conta com este email.', 409);
    }

    const newUser = {
      id: nextId(users),
      nome,
      email,
      senha: senhaHash,
      createdAt: new Date().toISOString(),
    };

    return { value: [...users, newUser], result: newUser };
  });

  return response.status(201).json({
    message: 'Conta criada com sucesso.',
    token: signToken(user),
    user: publicUser(user),
  });
}

async function login(request, response) {
  const email = validateEmail(request.body.email);
  const senha = validatePassword(request.body.senha);

  const users = await store.read(usersPath);
  const user = users.find((item) => item.email === email);

  // Always run a comparison to keep timing consistent whether or not the
  // email exists, then fail with a single generic message.
  const matches = user
    ? await bcrypt.compare(senha, user.senha)
    : await bcrypt.compare(senha, '$2a$10$invalidinvalidinvalidinvalidinv');

  if (!user || !matches) {
    throw new AppError('Email ou senha inválidos.', 401);
  }

  return response.json({
    message: 'Login realizado com sucesso.',
    token: signToken(user),
    user: publicUser(user),
  });
}

module.exports = {
  login,
  register,
};
