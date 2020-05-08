import * as convict from 'convict';

// Define a schema
const convictConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
});
convictConfig.validate({ allowed: 'strict' });

export const config = convictConfig;
