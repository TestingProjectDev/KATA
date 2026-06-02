export default {
  name: 'ping',
  aliases: ['p'],
  category: 'General',
  description: 'Replies with pong and latency.',
  async execute(sock, message, args) {
    const startTime = Date.now();
    await sock.sendMessage(message.key.remoteJid, { text: 'Pong!' }, { quoted: message });
    const endTime = Date.now();
    const latency = endTime - startTime;
    await sock.sendMessage(message.key.remoteJid, { text: `Latency: ${latency}ms` }, { quoted: message });
  },
};
