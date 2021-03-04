const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const command = require('./command');
const firstMessage = require('./first-message');

client.on('ready', () => {
    console.log('Im online ya know')
    // just a test
    firstMessage(client, '816869030681509958', 'hello there', ['⚙','👀'])

    command(client, ["ping", "pong"], (message) => {
        message.channel.send('Pong!')
    })

    command(client, 'serverlist', (message) => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
        })
    })

    //Moderation
    command(client, ['cc', 'clear channel'], message => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then(results => {
                message.channel.bulkDelete(results)
            })
        }
    })

    command(client, 'status', message => {
        if (message.member.id == 654142589783769117) {
            const content = message.content.replace('/status ', '')

            client.user.setPresence({
                activity: {
                    name: content,
                    type: 0
                }
            })
            message.channel.send(`Done. Presence has been set to **Playing ${content}**`)
        }
        else {
            message.channel.send("You are not **The 6th Champion**")
        }
        
    })
});



// index.js
const dotenv = require('dotenv');
dotenv.config();
// ... client setup (keep reading)
client.login(process.env.TOKEN);