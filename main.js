const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG, SSL_OP_EPHEMERAL_RSA } = require('constants');
const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = 'p!'

const fs = require('fs');

client.commands = new Discord.Collection();

let messagesSent = 0;

let blacklistedChannels = new Array();
blacklistedChannels.length = 0;

updateBlacklist();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Pokemonbot is online!')
})

client.on('message', message => {
    if ((message.author.bot) || (blacklistedChannels.indexOf(message.channel.id) != -1)) {
        return;
    }

    else if (!message.content.startsWith(prefix)) {
        messagesSent++;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
    else if (command == 'catch') {
        client.commands.get('catch').execute(message, args);
    }
    else if (command == 'help') {
        client.commands.get('help').execute(message, args);
    }
    else if (command == 'blacklist') {
        client.commands.get('blacklist').execute(message, args);
        sleep(1000).then(() => {
            updateBlacklist();
        });
    }
    else if (command == 'youmustchoose') {
        client.commands.get('youmustchoose').execute(message, args);
    }
    if (messagesSent >= 5) {
        messagesSent = 0;
        client.commands.get('spawnpokemon').execute(message);
    }
})


function updateBlacklist() {
    fs.readFile('./settings.txt/', (err, data) => {
        if (err) throw err;
        dataLines = data.toString().split("\n");
        for (let i = 0; i < dataLines.length; i++) {
            lineArray = dataLines[i].split(" ");
            if (lineArray[lineArray.length - 1] == "\r") {
                lineArray.splice(lineArray.length - 1, 1, "");
            }
            if (lineArray[0] == "blacklistedchannels") {
                for (let j = 2; j < lineArray.length; j++) {
                    if (blacklistedChannels.indexOf(lineArray[j]) == -1 && lineArray[j] != "") {
                        blacklistedChannels.push(lineArray[j].substring(2, lineArray[j].length - 1));
                    }
                }
            }
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

client.login('NzY4OTU1NDU3NDY5NDE1NDg0.X5H_kw.hp53IpQ3QrUbN80J8t96N640LVM');