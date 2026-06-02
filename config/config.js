import dotenv from 'dotenv';
dotenv.config();

export default {
  BOT_NAME: process.env.BOT_NAME || 'KATA',
  PREFIX: process.env.PREFIX || '!',
  OWNER_NUMBER: process.env.OWNER_NUMBER || '2348012345678',
  SESSION_DIR: './session.json',
  DATABASE_URL: process.env.DATABASE_URL || './database/database.json',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  // Add other configurable options here
};
