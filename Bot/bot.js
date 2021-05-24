const TOKEN = process.env.DISCORD_TOKEN;
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.login(TOKEN);

module.exports = bot;