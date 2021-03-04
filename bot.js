const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();



client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('Im online ya know');
}

client.on('message', gotMessage); 

function gotMessage(msg) {
    if (msg.content === 'champion bot') {
        msg.reply('You called?');
    } else if (msg.content === 'é' && msg.author != client.user) {
        msg.channel.send('é');
    }
}
// index.js
const dotenv = require('dotenv');
dotenv.config();
// ... client setup (keep reading)
client.login(process.env.TOKEN);