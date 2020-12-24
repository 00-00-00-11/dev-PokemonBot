module.exports = {
    name: 'spawnpokemon',
    description: 'This spawns a pokemon in the Discord channel.',
    execute(message, senderCount, wildPokemon) {
        message.channel.send("A wild pokemon has appeared!");
        const fs = require('fs');
        const Discord = require('discord.js');
        const pokemon = fs.readdirSync('./Pokemon/');
        const pokemonShiny = fs.readdirSync('./ShinyPokemon/');
        const pokemonLegendary = fs.readdirSync('./LegendaryPokemon/');
        const pokemonShinyLegendary = fs.readdirSync('./ShinyLegendaryPokemon/');

        let legendChance = Math.random();
        let shinyChance = Math.random();
        let legendMultiplier;
        if (senderCount > 2) {
            legendMultiplier = senderCount;
        }
        else {
            legendMultiplier = 0;
        }

        let url;

        if (legendChance < (1 / (200 - (senderCount * 5)))) {
            if (shinyChance < (1 / 4096)) {
                let index = Math.floor(Math.random() * pokemonShinyLegendary.length);
                url = pokemonShinyLegendary[index]

                let attachment = new Discord.MessageAttachment(`./ShinyLegendaryPokemon/${url}`, 'PokebotSpawn.png');

                let embed = new Discord.MessageEmbed()
                    .setTitle("A wild pokémon has appeared!")
                    .setDescription("Guess the pokémon and type p!catch <pokémon> to catch it!")
                    .setColor("#4ca87a")
                    .attachFiles(attachment)
                    .setImage('attachment://PokebotSpawn.png')

                message.channel.send(embed);
                wildPokemon.push(`./ShinyLegendaryPokemon/${url}`);
            }
            else {
                let index = Math.floor(Math.random() * pokemonLegendary.length);
                url = pokemonLegendary[index]

                let attachment = new Discord.MessageAttachment(`./LegendaryPokemon/${url}`, 'PokebotSpawn.png');

                let embed = new Discord.MessageEmbed()
                    .setTitle("A wild pokémon has appeared!")
                    .setDescription("Guess the pokémon and type p!catch <pokémon> to catch it!")
                    .setColor("#4ca87a")
                    .attachFiles(attachment)
                    .setImage('attachment://PokebotSpawn.png')

                message.channel.send(embed);
                wildPokemon.push(`./LegendaryPokemon/${url}`);
            }
        }
        else {
            if (shinyChance < (1 / 4096)) {
                let index = Math.floor(Math.random() * pokemonShiny.length);
                url = pokemonShiny[index]

                let attachment = new Discord.MessageAttachment(`./ShinyPokemon/${url}`, 'PokebotSpawn.png');

                let embed = new Discord.MessageEmbed()
                    .setTitle("A wild pokémon has appeared!")
                    .setDescription("Guess the pokémon and type p!catch <pokémon> to catch it!")
                    .setColor("#4ca87a")
                    .attachFiles(attachment)
                    .setImage('attachment://PokebotSpawn.png')

                message.channel.send(embed);
                wildPokemon.push(`./ShinyPokemon/${url}`);
            }
            else {
                let index = Math.floor(Math.random() * pokemon.length);
                url = pokemon[index]

                let attachment = new Discord.MessageAttachment(`./Pokemon/${url}`, 'PokebotSpawn.png');

                let embed = new Discord.MessageEmbed()
                    .setTitle("A wild pokémon has appeared!")
                    .setDescription("Guess the pokémon and type p!catch <pokémon> to catch it!")
                    .setColor("#4ca87a")
                    .attachFiles(attachment)
                    .setImage('attachment://PokebotSpawn.png')

                message.channel.send(embed);
                wildPokemon.push(`./Pokemon/${url}`);
            }
        }
    }
}