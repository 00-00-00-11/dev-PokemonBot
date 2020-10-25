const { mainModule } = require('process');

module.exports = {
    name: 'blacklist',
    description: 'This blacklists certain channels that the bot cannot read.',
    execute(message, args) {
        const fs = require('fs');
        fs.readFile('./settings.txt/', (err, data) => {
            if (err) throw err;
            dataLines = data.toString().split("\n");
            for (let i = 0; i < dataLines.length; i++) {
                lineArray = dataLines[i].split(" ");
                if (lineArray[0] == "blacklistedchannels") {
                    if (lineArray.indexOf(args[0]) == -1) {
                        if (args[0].indexOf("#") == -1) {
                            message.channel.send("Please type out the channel name in the #channel-name format.")
                            return;
                        }
                        lineArray.splice(lineArray.length - 1, 0, args[0]);
                        lineString = lineArray.join(" ");
                        dataLines[0] = lineString;
                        dataString = dataLines.join("\n");
                        fs.writeFile('./settings.txt', dataString, (err) => {
                            if (err) throw err;
                            console.log("Data written successfully");
                        });
                        message.channel.send("Channel has been successfully blacklisted!");
                    }
                    else {
                        message.channel.send("That channel is already on the blacklist.");
                    }
                }
            }
        });
    }
}