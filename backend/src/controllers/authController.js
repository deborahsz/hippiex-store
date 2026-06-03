const fs = require('fs/promises');
const path = require('path');

const usersPath = path.resolve(__dirname, '../data/users.json');

async function readUsers() {
  const data = await fs.readFile(usersPath, 'utf-8');
  return JSON.parse(data);
}

async function saveUsers(users) {
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
}

async function register(request, response) {
  const { nome, email, senha } = request.body;

  if (!nome || !email || !senha) {
    return response.status(400).json({
      message: 'Nome, email e senha são obrigatórios.',
    });
  }

  const users = await readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const userExists = users.some((user) => user.email === normalizedEmail);

  if (userExists) {
    return response.status(409).json({
      message: 'Já existe uma conta com este email.',
    });
  }

  const user = {
    id: users.length + 1,
    nome: nome.trim(),
    email: normalizedEmail,
    senha,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await saveUsers(users);

  const { senha: _senha, ...userWithoutPassword } = user;

  return response.status(201).json({
    message: 'Conta criada com sucesso.',
    user: userWithoutPassword,
  });
}

async function login(request, response) {
  const { email, senha } = request.body;

  if (!email || !senha) {
    return response.status(400).json({
      message: 'Email e senha são obrigatórios.',
    });
  }

  const users = await readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find(
    (registeredUser) =>
      registeredUser.email === normalizedEmail && registeredUser.senha === senha
  );

  if (!user) {
    return response.status(401).json({
      message: 'Email ou senha inválidos.',
    });
  }

  const { senha: _senha, ...userWithoutPassword } = user;

  return response.json({
    message: 'Login realizado com sucesso.',
    user: userWithoutPassword,
  });
}

module.exports = {
  login,
  register,
};
