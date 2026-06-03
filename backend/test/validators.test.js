const test = require('node:test');
const assert = require('node:assert/strict');

const {
  validateName,
  validateEmail,
  validatePassword,
  validateProductId,
} = require('../src/lib/validators');

test('validateEmail normalizes and rejects bad formats', () => {
  assert.equal(validateEmail('  User@Example.COM '), 'user@example.com');
  assert.throws(() => validateEmail('not-an-email'));
  assert.throws(() => validateEmail(''));
  assert.throws(() => validateEmail(undefined));
});

test('validatePassword enforces length bounds', () => {
  assert.equal(validatePassword('secret1'), 'secret1');
  assert.throws(() => validatePassword('123'));
  assert.throws(() => validatePassword(''));
});

test('validateName trims and enforces length', () => {
  assert.equal(validateName('  Deborah  '), 'Deborah');
  assert.throws(() => validateName('x'));
  assert.throws(() => validateName(''));
});

test('validateProductId accepts positive integers only', () => {
  assert.equal(validateProductId('3'), 3);
  assert.equal(validateProductId(5), 5);
  assert.throws(() => validateProductId('abc'));
  assert.throws(() => validateProductId(-1));
  assert.throws(() => validateProductId(0));
});
