module.exports = {
    name: 'catch',
    description: 'This command is used to catch pokemon',
    execute(message, args, wildPokemon) {
        const fs = require('fs');
        const playerFiles = fs.readdirSync('./Players/');
        if (playerFiles.indexOf(message.author.id + ".txt") == -1) {
            message.channel.send("Please create a profile using p!youmustchoose before catching pokemon.");
            return;
        }
        let found = false;
        let pokemonCaught;
        for (let pokemon of wildPokemon) {
            if (pokemon.indexOf(args[0].toLowerCase()) != -1) {
                pokemonCaught = pokemon;
                wildPokemon.pop(pokemon);
                found = true;
            }
        }
        if (found) {
            const pokemonLevel = Math.floor(Math.random() * 80);
            message.channel.send(`Congratulations ${message.author}! You caught a level ${pokemonLevel} ${args[0].charAt(0).toUpperCase() + args[0].slice(1)}!`)
            fs.appendFile(`./Players/${message.author.id}.txt`, pokemonCaught + ` ${pokemonLevel} \n`, (err) => {
                if (err) throw err;
                console.log("Data written successfully");
            });
        }
    }
}