module.exports = {
    name: 'youmustchoose',
    description: 'This command creates a new user for the author of the message if they dont already exist, and allows them to choose a starting pokemon.',
    execute(message, args) {
        newUser = message.author.id;
        const fs = require('fs');
        const playerFiles = fs.readdirSync('./Players/');
        if (playerFiles.indexOf(message.author.id + ".txt") != -1) {
            message.channel.send("You already have a profile.");
            return;
        }

        const prefix = 'p!'
        const pokemon = fs.readdirSync('./Pokemon/');
        const Discord = require('discord.js');
        
        message.channel.send("Choose your starting pokemon! \nUse the command p!choose [Pokemon-name] to select. \nType p!cancel to quit the process.");

        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { time: 15000 });

        message.channel.send({
            files: [{
                attachment: `./Starters.png`,
                name: "Starters.png"
            }]
        });

        const starterIndexes = ["./Pokemon/001bulbasaur.png", "./Pokemon/004charmander.png", "./Pokemon/007squirtle.png", "./Pokemon/152chikorita.png", "./Pokemon/155cyndaquil.png", "./Pokemon/158totodile.png", "./Pokemon/252treeko.png", "./Pokemon/255torchic.png", "./Pokemon/258mudkip.png", "./Pokemon/387turtwig.png", "./Pokemon/290chimchar.png", "./Pokemon/393piplup.png", "./Pokemon/495snivy.png", "./Pokemon/498tepig.png", "./Pokemon/501oshawott.png"];
        const starterNames = ["bulbasaur", "charmander", "squirtle", "chikorita", "cyndaquil", "totodile", "treeko", "torchic", "mudkip", "turtwig", "chimchar", "piplup", "snivy", "tepig", "oshawatt"];

        collector.on('collect', m => {
            console.log(`Collected ${m.content}`);
            const args = m.content.slice(prefix.length).split(/ +/);
            const command = args.shift().toLowerCase();
            if (command == "choose") {
                if (starterNames.indexOf(args[0].toLowerCase()) != -1) {
                    m.channel.send(`${args[0].charAt(0).toUpperCase() + args[0].slice(1)} was chosen!`);
                    dataArray = ["selected = 2", "messages = 0", starterIndexes[starterNames.indexOf(args[0].toLowerCase())] + " 1"];
                    dataString = dataArray.join("\n");
                    fs.writeFile(`./Players/${m.author.id}.txt`, dataString + "\n", (err) => {
                        if (err) throw err;
                        console.log("Data written successfully");
                        collector.stop();
                    });
                }
                else {
                    m.channel.send("Your choice could not be understood. \nPlease try again.");
                }
            }
            else if (m.content.toLowerCase() == "p!cancel") {
                m.channel.send("Process cancelled!");
                collector.stop();
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
    }
}