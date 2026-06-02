import config from '../config/config.js';

export default {
  name: 'play',
  aliases: ['music'],
  category: 'Downloader',
  description: 'Searches for and downloads music. (Currently a placeholder)',
  async execute(sock, message, args) {
    await sock.sendMessage(message.key.remoteJid, { text: 'The \'play\' command is currently under development. Music search and download functionality will be added in a future update.' }, { quoted: message });
  },
};
