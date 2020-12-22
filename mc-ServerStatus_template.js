// Joshua Prila
// Updated Dec 2020
// Check server status for given MC Server

// Setup, don't change
const Discord = require('discord.js');
const client = new Discord.Client();
const {Client, RichEmbed, DiscordAPIError } = require('discord.js')
const bot = new Client()
const ping = require('minecraft-server-util');
const util = require('minecraft-server-util');
const PREFIX = '!'
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Setup, change to fit your needs
const token = 'PUT YOUR DISCORD BOT TOKEN HERE'
const ip = 'PUT YOUR MINECRAFT SERVER IP HERE'
const port = null // PORT HERE

// Bot turns on
bot.on('ready', () =>{
    console.log('Bot has come online.')
})
bot.on('message', async (message) =>{
    let args = message.content.substring(PREFIX.length).split(' ')
    // Type "!mc" to update status
    switch(args[0]){

        case 'mc':
            try{

                let x = await client.commands.get('clear').execute(message,args)
                statusOutput = 'zzz....'
                serverStatus = 'Offline.'

                let response = await util.status(ip, { port, enableSRV: true, timeout: 5000, protocolVersion: 47 })
                .then((response) => {
                    console.log('GOOD')
                    serverStatus = 'Online!'

                    
                    serverVer = response.version
                    players = response.onlinePlayers
                    console.log(serverStatus)
                    statusOutput = response;
                })
                .catch((error) => {
                    console.log('BAD!')

                    statusOutput = 'Error.'
                    throw error;
                });

                Embed = new Discord.MessageEmbed()
                .setTitle('Server Status')
                .addField('Current Server Status', serverStatus)
                .addField('Server Version', serverVer)
                .addField('Current number of players',players)
                
                message.channel.send(Embed)
                console.log("successful print")
            break
        }
        catch(err){
            console.log('Error')
            Embed = new Discord.MessageEmbed()
            .setTitle('Server Status')
            .addField('Current Server Status', 'Offline.')
            message.channel.send(Embed)
        }

    }

})

bot.login(token)
