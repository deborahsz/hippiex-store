require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const DEFAULT_JWT_SECRET = 'hippiex-dev-secret-change-me';
const jwtSecret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;

if (isProduction && jwtSecret === DEFAULT_JWT_SECRET) {
  // Fail fast: never run in production with the shared development secret.
  throw new Error('JWT_SECRET must be set in production.');
}

if (!process.env.JWT_SECRET) {
  // eslint-disable-next-line no-console
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
  // Comma-separated list of allowed origins, or "*" (default) to allow any.
  corsOrigin: process.env.CORS_ORIGIN || '*',
};

module.exports = config;
