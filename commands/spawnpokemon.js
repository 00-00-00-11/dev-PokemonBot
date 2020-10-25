module.exports = {
    name: 'spawnpokemon',
    description: 'This spawns a pokemon in the Discord channel.',
    execute(message) {
        message.channel.send("A wild pokemon has appeared!");
        const fs = require('fs');
        const pokemon = fs.readdirSync('./Pokemon/');
        const pokemonShiny = fs.readdirSync('./Shiny Pokemon/');
        const pokemonLegendary = fs.readdirSync('./Legendary Pokemon/');
        const pokemonShinyLegendary = fs.readdirSync('./Shiny Legendary Pokemon/');

        let legendChance = Math.random();
        let shinyChance = Math.random();

        let url;

        if (legendChance < (1 / 200)) {
            if (shinyChance < (1 / 4096)) {
                let index = Math.floor(Math.random() * pokemonShinyLegendary.length);
                url = pokemonShinyLegendary[index]
                message.channel.send({
                    files: [{
                        attachment: `./Shiny Legendary Pokemon/${url}`,
                        name: url
                    }]
                });
            }
            else {
                let index = Math.floor(Math.random() * pokemonLegendary.length);
                url = pokemonLegendary[index]
                message.channel.send({
                    files: [{
                        attachment: `./Legendary Pokemon/${url}`,
                        name: url
                    }]
                });
            }
        }
        else {
            if (shinyChance < (1 / 4096)) {
                let index = Math.floor(Math.random() * pokemonShiny.length);
                url = pokemonShiny[index]
                message.channel.send({
                    files: [{
                        attachment: `./Shiny Pokemon/${url}`,
                        name: url
                    }]
                });
            }
            else {
                let index = Math.floor(Math.random() * pokemon.length);
                url = pokemon[index]
                message.channel.send({
                    files: [{
                        attachment: `./Pokemon/${url}`,
                        name: url
                    }]
                });
            }
        }
    }
}