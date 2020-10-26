module.exports = {
    name: 'pokemon',
    description: 'This command returns a list of the authors pokemon, in segments if the length is too great.',
    execute(message, args) {
        const fs = require('fs');
        const playerFiles = fs.readdirSync('./Players/');
        if (playerFiles.indexOf(message.author.id + ".txt") == -1) {
            message.channel.send("Please create a profile using p!youmustchoose before checking your pokemon.");
            return;
        }
        fs.readFile(`./Players/${message.author.id}.txt/`, (err, data) => {
            if (err) throw err;
            dataLines = data.toString().split("\n");
            let selectedIndexString = dataLines[0];
            let selectedIndexArray = selectedIndexString.split(/ +/);
            let sentMessageArray = []
            sentMessageArray.push("Number: Name, Level\n")
            for (let i = 2; i < dataLines.length - 2; i++) {
                lineArray = dataLines[i].split(/ +/);
                let pokeName = lineArray[0].substring(lineArray[0].lastIndexOf("/") + 4, lineArray[0].length - 4);
                if (i == selectedIndexArray[2]) {
                    sentMessageArray.push((i - 1) + ": " + pokeName.charAt(0).toUpperCase() + pokeName.slice(1) + ", " + lineArray[1] + "       <= Currently selected\n");
                }
                else {
                    sentMessageArray.push((i - 1) + ": " + pokeName.charAt(0).toUpperCase() + pokeName.slice(1) + ", " + lineArray[1] + "\n");
                }
            }
            message.channel.send(sentMessageArray.join(""));
        });
    }
}