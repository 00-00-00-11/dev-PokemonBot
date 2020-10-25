module.exports = {
    name: 'help',
    description: 'This command is for the real ones',
    execute(message, args) {
        const messageSender = message.author;
        message.channel.send(`Thanks ${messageSender}, I feel much more welcome.`);
    }
}