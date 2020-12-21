module.exports = {
    name: 'spawnpokemon',
    description: 'This spawns a pokemon in the Discord channel.',
    execute(message, senderCount, wildPokemon) {
        message.channel.send("A wild pokemon has appeared!");
        const fs = require('fs');
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
                message.channel.send({
                    files: [{
                        attachment: "./Shiny Legendary Pokemon/PokebotSpawn",
                        name: "./Shiny Legendary Pokemon/PokebotSpawn.png"
                    }]
                });
                wildPokemon.push(`./Shiny Legendary Pokemon/${url}`);
            }
            else {
                let index = Math.floor(Math.random() * pokemonLegendary.length);
                url = pokemonLegendary[index]
                message.channel.send({
                    files: [{
                        attachment: `./Legendary Pokemon/${url}`,
                        name: "./Legendary Pokemon/PokebotSpawn.png"
                    }]
                });
                wildPokemon.push(`./Legendary Pokemon/${url}`);
            }
        }
        else {
            if (shinyChance < (1 / 4096)) {
                let index = Math.floor(Math.random() * pokemonShiny.length);
                url = pokemonShiny[index]
                message.channel.send({
                    files: [{
                        attachment: `./Shiny Pokemon/${url}`,
                        name: "./Shiny Pokemon/PokebotSpawn.png"
                    }]
                });
                wildPokemon.push(`./Shiny Pokemon/${url}`);
            }
            else {
                let index = Math.floor(Math.random() * pokemon.length);
                url = pokemon[index]
                message.channel.send({
                    files: [{
                        attachment: `./Pokemon/${url}`,
                        name: "./Pokemon/PokebotSpawn.png"
                    }]
                });
                wildPokemon.push(`./Pokemon/${url}`);
            }
        }
    }
}