const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs/promises');
const path = require('path');

process.env.PORT = process.env.TEST_PORT || '4599';
process.env.JWT_SECRET = 'test-secret';

const usersPath = path.resolve(__dirname, '../src/data/users.json');
const ordersPath = path.resolve(__dirname, '../src/data/orders.json');

let server;
let baseUrl;
let usersBackup;
let ordersBackup;

test.before(async () => {
  usersBackup = await fs.readFile(usersPath, 'utf-8').catch(() => '[]\n');
  ordersBackup = await fs.readFile(ordersPath, 'utf-8').catch(() => '[]\n');
  await fs.writeFile(usersPath, '[]\n');
  await fs.writeFile(ordersPath, '[]\n');

  server = require('../src/server');
  await new Promise((resolve) => {
    if (server.listening) return resolve();
    server.once('listening', resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await fs.writeFile(usersPath, usersBackup);
  await fs.writeFile(ordersPath, ordersBackup);
});

async function json(method, route, { token, body } = {}) {
  const response = await fetch(`${baseUrl}${route}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
}

test('full flow: register, login, browse, order, history', async () => {
  const register = await json('POST', '/auth/register', {
    body: { nome: 'Deborah', email: 'deb@test.com', senha: 'senha123' },
  });
  assert.equal(register.status, 201);
  assert.ok(register.data.token, 'register returns a token');
  assert.equal(register.data.user.email, 'deb@test.com');
  assert.equal(register.data.user.senha, undefined, 'password is never returned');

  const dup = await json('POST', '/auth/register', {
    body: { nome: 'Deborah', email: 'deb@test.com', senha: 'senha123' },
  });
  assert.equal(dup.status, 409);

  const bad = await json('POST', '/auth/register', {
    body: { nome: 'X', email: 'bad', senha: '1' },
  });
  assert.equal(bad.status, 400);

  const wrong = await json('POST', '/auth/login', {
    body: { email: 'deb@test.com', senha: 'wrongpass' },
  });
  assert.equal(wrong.status, 401);

  const login = await json('POST', '/auth/login', {
    body: { email: 'deb@test.com', senha: 'senha123' },
  });
  assert.equal(login.status, 200);
  const token = login.data.token;
  assert.ok(token);

  const products = await json('GET', '/products');
  assert.equal(products.status, 200);
  assert.ok(Array.isArray(products.data) && products.data.length > 0);
  const product = products.data[0];

  const unauth = await json('POST', '/orders', {
    body: { produtoId: product.id, tamanho: product.tamanhos[0], pagamento: 'Pix' },
  });
  assert.equal(unauth.status, 401);

  const order = await json('POST', '/orders', {
    token,
    body: {
      produtoId: product.id,
      tamanho: product.tamanhos[0],
      pagamento: 'Pix',
      tipo: 'compra',
    },
  });
  assert.equal(order.status, 201);
  assert.match(order.data.order.numero, /^HPX-\d{4}$/);
  assert.ok(order.data.order.userId, 'order is linked to the user');

  const badPay = await json('POST', '/orders', {
    token,
    body: { produtoId: product.id, tamanho: product.tamanhos[0], pagamento: 'Cartao' },
  });
  assert.equal(badPay.status, 400);

  const history = await json('GET', '/orders', { token });
  assert.equal(history.status, 200);
  assert.equal(history.data.length, 1);
  assert.equal(history.data[0].numero, order.data.order.numero);

  const missing = await json('GET', '/nope');
  assert.equal(missing.status, 404);
});
