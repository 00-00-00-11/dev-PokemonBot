module.exports = {
    name: 'catch',
    description: 'This command is used to catch pokemon',
    execute(message, args) {
        message.channel.send('fuck you bitch');
        const fs = require('fs');
        const playerFiles = fs.readdirSync('./Players/');
        if (playerFiles.indexOf(message.author.id + ".txt") == -1) {
            message.channel.send("Please create a profile using p!youmustchoose before catching pokemon.");
        }
    }
}