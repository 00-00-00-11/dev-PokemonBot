module.exports = {
    name: 'catch',
    description: 'This command is used to catch pokemon',
    execute(message, args, wildPokemon) {
        if (args[0] == null) {
            console.log("Incorrect input");
            return;
        }
        else if ((args[0].toLowerCase() == 'these' && args[1].toLowerCase() == 'hands') || args[0].toLowerCase() == 'thesehands') {
            message.channel.send("Very funny jon");
            return;
        }
        const fs = require('fs');
        const playerFiles = fs.readdirSync('./Players/');
        if (playerFiles.indexOf(message.author.id + ".txt") == -1) {
            message.channel.send("Please create a profile using p!youmustchoose before catching pokemon.");
            return;
        }
        let found = false;
        let pokemonCaught;
        for (let pokemon of wildPokemon) {
            let pokeName = pokemon.substring(pokemon.lastIndexOf("/") + 4, pokemon.length - 4);
            if (pokeName === args[0].toLowerCase()) {
                pokemonCaught = pokemon;
                wildPokemon.splice(wildPokemon.indexOf(pokemon), 1)
                found = true;
            }
        }
        if (found) {
            const pokemonLevel = Math.ceil(((Math.random() * 80) * (Math.random() * .5 + .5)));
            message.channel.send(`Congratulations ${message.author}! You caught a level ${pokemonLevel} ${args[0].charAt(0).toUpperCase() + args[0].slice(1)}!`)
            fs.appendFile(`./Players/${message.author.id}.txt`, pokemonCaught + ` ${pokemonLevel} \n`, (err) => {
                if (err) throw err;
                console.log("Data written successfully");
            });
        }
    }
}