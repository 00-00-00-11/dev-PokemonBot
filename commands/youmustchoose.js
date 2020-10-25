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
        else {
            message.channel.send("Please check your DMs to choose your first pokemon!");
        }

        const pokemon = fs.readdirSync('./Pokemon/');
        
    }
}