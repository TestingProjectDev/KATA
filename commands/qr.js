import qrcode from 'qrcode-terminal';
import config from '../config/config.js';

export default {
  name: 'qr',
  aliases: [],
  category: 'Utility',
  description: 'Generates a QR code from the given text. Usage: !qr <text>',
  async execute(sock, message, args) {
    const text = args.join(' ');
    if (!text) {
      return sock.sendMessage(message.key.remoteJid, { text: 'Please provide text to generate a QR code.' }, { quoted: message });
    }

    qrcode.generate(text, { small: true }, (qr) => {
      sock.sendMessage(message.key.remoteJid, { text: qr }, { quoted: message });
    });
  },
};
