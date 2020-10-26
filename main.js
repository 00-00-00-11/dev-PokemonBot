const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG, SSL_OP_EPHEMERAL_RSA } = require('constants');
const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = 'p!'

const fs = require('fs');

client.commands = new Discord.Collection();

let messagesSent = 0;

let blacklistedChannels = [];

let wildPokemon = [];
let spawnRate;
const memberMultiplier = 1;
const highCurrentMembers = 8;


let onlineCount;
let membersInGuild;

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
        updateMessages(message.author.id);
        membersInGuild = message.guild.members.cache.array();
        onlineCount = 0;
        for (let member of membersInGuild) {
            if ((member.presence.status == 'online') && (!member.user.bot)) {
                onlineCount++;
            }
        }
        spawnRate = 15 + Math.floor((-1 / 1.5) * onlineCount);
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
    else if (command == 'catch') {
        client.commands.get('catch').execute(message, args, wildPokemon);
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
    else if (command == 'pokemon') {
        client.commands.get('pokemon').execute(message, args);
    }
    if (messagesSent >= spawnRate) {
        messagesSent = 0;
        client.commands.get('spawnpokemon').execute(message, onlineCount, wildPokemon);
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

function updateMessages(author) {
    fs.readFile(`./Players/${author}.txt`, 'utf8', function(err, data) {
        if (err) return console.log(err);
        dataLines = data.toString().split("\n");
        selectedLine = dataLines[0].split(/ +/);
        messagesLine = dataLines[1].split(/ +/);
        selectedPokemonLine = dataLines[selectedLine[2]].split(/ +/);;
        currentMessages = messagesLine[2];
        currentMessages++;
        if (currentMessages >= selectedPokemonLine[1] * 2) {
            let searchStringMessages = 'messages';
            let searchStringLevel = `${selectedPokemonLine[0]}`;
            let replaceMessages = new RegExp('^.*' + searchStringMessages + '.*$', 'gm');
            let formatted = data.replace(replaceMessages, 'messages = 0');
            let replaceLevel = new RegExp('^.*' + searchStringLevel + '.*$', 'gm');
            formatted = formatted.replace(replaceLevel, `${selectedPokemonLine[0]}` + " " + `${++selectedPokemonLine[1]}`);
            fs.writeFile(`./Players/${author}.txt`, formatted, 'utf8', function(err) {
                if (err) return console.log(err);
            });
        }
        else {
            let searchString = 'messages';
            let re = new RegExp('^.*' + searchString + '.*$', 'gm');
            let formatted = data.replace(re, `messages = ${currentMessages}`);
            fs.writeFile(`./Players/${author}.txt`, formatted, 'utf8', function(err) {
                if (err) return console.log(err);
            });
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

client.login('NzY4OTU1NDU3NDY5NDE1NDg0.X5H_kw.hp53IpQ3QrUbN80J8t96N640LVM');