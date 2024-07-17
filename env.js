const z = require('zod');
const packageJSON = require('./package.json');
const path = require('path');

const APP_ENV = process.env.APP_ENV ?? 'development';
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({ path: envPath });

// Static variables
const BUNDLE_ID = 'com.obytes';
const PACKAGE = 'com.obytes';
const NAME = 'atlas-quiz-app';
const EXPO_ACCOUNT_OWNER = 'mullenlowesl';
const EAS_PROJECT_ID = '56569ad4-44f7-48f4-b75c-2576a9acaa56';
const SCHEME = 'obytesApp';

// Function to add suffix based on APP_ENV
const withEnvSuffix = (/** @type {string} */ name) =>
  APP_ENV === 'main' ? name : `${name}.${APP_ENV}`;

// Define environment variables schema
const client = z.object({
  APP_ENV: z.enum(['development', 'staging', 'main']),
  NAME: z.string(),
  SCHEME: z.string(),
  BUNDLE_ID: z.string(),
  PACKAGE: z.string(),
  VERSION: z.string(),

  // Client env variables
  API_URL: z.string().min(1, { message: 'API_URL is required' }),
  VAR_NUMBER: z.number({ invalid_type_error: 'VAR_NUMBER must be a number' }),
  VAR_BOOL: z.boolean(),
});

const buildTime = z.object({
  EXPO_ACCOUNT_OWNER: z.string(),
  EAS_PROJECT_ID: z.string(),
  SECRET_KEY: z.string().min(1, { message: 'SECRET_KEY is required' }),
});

// Environment variables for client
const _clientEnv = {
  APP_ENV,
  NAME,
  SCHEME,
  BUNDLE_ID: withEnvSuffix(BUNDLE_ID),
  PACKAGE: withEnvSuffix(PACKAGE),
  VERSION: packageJSON.version,
  API_URL: process.env.API_URL,
  VAR_NUMBER: Number(process.env.VAR_NUMBER),
  VAR_BOOL: process.env.VAR_BOOL === 'true',
};

// Environment variables for build time
const _buildTimeEnv = {
  EXPO_ACCOUNT_OWNER,
  EAS_PROJECT_ID,
  SECRET_KEY: process.env.SECRET_KEY,
};

// Merge and validate environment variables
const _env = { ..._clientEnv, ..._buildTimeEnv };

const merged = buildTime.merge(client);
const parsed = merged.safeParse(_env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors
  );
  throw new Error(
    'Invalid environment variables, Check terminal for more details'
  );
}

const Env = parsed.data;
const ClientEnv = client.parse(_clientEnv);

module.exports = { Env, ClientEnv, withEnvSuffix };
