const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const command = require('./command');
const dotenv = require('dotenv').config();
const guildID = '764927590070353940';
const keepAlive = require('./server');


const getApp = (guildID) => {
    const app = client.api.applications(client.user.id)
    if (guildID) {
        app.guilds(guildID)
    }
    return app
}
client.on('ready', async () => {
    console.log('Im online ya know')
    client.user.setStatus('invisible').then(console.log).catch(console.error)
    const commands = await getApp(guildID).commands.get()
    console.log(commands)




    await getApp(guildID).commands.post({
        data: {
            name: "ping",
            description: "A simple ping command",
        },
    })
    await getApp(guildID).commands.post({
        data: {
            name: "botinfo",
            description: "Prefixes, info, and general usage of bots here",
        }
    })
    
    /* To delete commands: 
    await getApp(guildID).commands('command_id').delete() 
    */



    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        const { name, options } = interaction.data
        const command = name.toLowerCase()

        const args = {}

        if (options) {
            for (const option of options) {
                const { name, value } = option
                args[name] = value
            }
        }

        switch(command) {
            case "ping":
                reply(interaction, "pong");
            case "botinfo":
                const embed1 = new Discord.MessageEmbed()
                .setTitle("Bot Info")
                .setDescription("There are many bots in this server, and I mean **MANY**. If you have a bot you made you want to add, or you think one bot is a good idea to add, DM the owner.")
                .addFields(
                    {
                        name: "<Insert Bot Here>",
                        value: "This Bot's prefix is `>>`. It is a bot made by The 6th Champion. Invite it to your servers :)\n"
                    },
                    {
                        name: "<Champion of the Botz>",
                        value: "This Bot's prefix is `>`. It is a bot made by The 6th Champion for this server.\n"
                    },
                    {
                        name: "Haptot",
                        value: "JOKE\n"
                    },
                    {
                        name: "Moyai",
                        value: "This Bot's prefix is `]]`. 🗿🗿🗿\n"
                    },
                    {
                        name: "QuoteAI",
                        value: "This Bot's prefix is `*`. It gives you random inspirational quotes\n"
                    },
                    {
                        name: "Plasma",
                        value: "```diff\n-TO BE KICKED\n``` This Bot's prefix is `=`. It keeps track of the amount of people you invite, and gives you roles\n"
                    },
                    {
                        name: "AmariBot",
                        value: "This Bot's prefix is `a!`. It does levels\n"
                    },
                    {
                        name: "Carl-Bot",
                        value: "```diff\n-MIGHT BE KICKED\n``` This Bot's prefix is `c!`. No idea why its here.\n"
                    },
                    {
                        name: "Dyno",
                        value: "```diff\n-TO BE KICKED\n``` This Bot's prefix is `d!`. Does a bunch of stuff.\n"
                    },
                    {
                        name: "Rythm",
                        value: "This Bot's prefix is `r!`. moosic is good\n"
                    },
                    {
                        name: "UnbelievaBoat",
                        value: "This Bot's prefix is `u!`. Fun stuff...play around with it\n"
                    },
                    {
                        name: "counting human",
                        value: "This Bot's prefix is `c?`. It is a bot made for us to count. look in <#799679622056902706>\n"
                    },
                    {
                        name: "DISBOARD",
                        value: "This Bot's prefix is `!d `. Bump the server so we can spread this community\n"
                    },
                    {
                        name: "DSL",
                        value: "This Bot's prefix is `no idea actually`. This bot is for the **D**iscord **S**erver **L**ist. vote this server [here](https://top.gg/servers/764927590070353940 '<Insert Server Here>')\n"
                    },
                    {
                        name: "Gerald",
                        value: "This Bot's prefix is `/`. le funny. talk with it in <#797580142279917598>\n"
                    },
                    {
                        name: "Kali",
                        value: "This Bot's prefix is `!`. A bot made by Isukali. Does some cool stuff, like compiling code.\n"
                    },
                    {
                        name: "Other",
                        value: "Any bots that aren't mentioned most likely aren't to be used at the moment. Ask Da6thChamp for more info."
                    },



                )
                .setColor("#9effff")
                
                reply(interaction, embed1)
          }
    })
})


const reply = async (interaction, response) => {
    let data = {
        content: response,
    }
    
    if (typeof response === 'object') {
        data = await createAPIMEssage(interaction, response)
    }
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data,
        },
    })
}



const createAPIMEssage = async (interaction, content) => {
    const { data, files } = await Discord.APIMessage.create(
        client.channels.resolve(interaction.channel_id),
        content
    )
    .resolveData()
    .resolveFiles()
    return { ...data, files }
}
keepAlive();
client.login(process.env.TOKEN);
// commenting :)