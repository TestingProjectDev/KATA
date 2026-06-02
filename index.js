import connectToWhatsApp from './lib/connection.js';
import { setupMessageHandling } from './lib/eventHandler.js';
import loadPlugins from './lib/pluginLoader.js';
import logger from './lib/logger.js';

const startBot = async () => {
  logger.info('Starting KATA bot...');
  const sock = await connectToWhatsApp();
  setupMessageHandling(sock);
  await loadPlugins();
  logger.info('KATA bot started successfully!');
};

startBot();
