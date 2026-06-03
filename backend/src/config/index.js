require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const DEFAULT_JWT_SECRET = 'hippiex-dev-secret-change-me';
const jwtSecret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;

if (isProduction && jwtSecret === DEFAULT_JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in production.');
}

if (!process.env.JWT_SECRET) {
  console.warn(
    '[config] JWT_SECRET not set. Using an insecure development default.'
  );
}

const config = {
  isProduction,
  port: Number(process.env.PORT) || 3333,
  jwt: {
    secret: jwtSecret,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS) || 10,
  corsOrigin: process.env.CORS_ORIGIN || '*',
};

module.exports = config;
