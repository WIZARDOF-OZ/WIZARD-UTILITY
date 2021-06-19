const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hey there!'))

app.listen(port, () =>
console.log(chalk.cyan(`Your app is listening a http://localhost:${port}`))
);



require("dotenv").config();
const config = require("./config"),
    DiscordJS = require("discord.js"),
    mongoose = require("mongoose"),
    DisTube = require('distube');
   
   
  
    getFiles = require("./Src/Functions/Base/getFiles"),
    chalk = require("chalk"),
    createTable = require("./Src/Functions/Base/createTable"),
    loadFunctions = require('./Src/Functions');

const client = new DiscordJS.Client({
    partials: ['CHANNEL', 'MESSAGE', 'REACTION', 'GUILD_MEMBER', 'USER']
    
});


const  db = require("old-wio.db");
const fs = require("fs");

client.distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n ${status(queue)}`
	))
	.on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}\n ${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))


    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });
client.commands = new DiscordJS.Collection();
client.events = 0;

async function load() {

    client.on("ready", () => {
        console.log(chalk.green("API > Connected"))

        const functions = loadFunctions(client);
        if (functions) {
            console.log(chalk.magenta(`Process > Loaded All Functions`))
        }

        const features = getFiles(config.featuresDir);
        client.events = features.length;
        console.log(chalk.cyan(`CommandHandler > Loaded ${features.length} Features`))
        features.forEach((files) => {
            const event = require(files[0]);
            event(client, config);
        });

        const commands = getFiles(config.commandDir);
        console.log(chalk.cyan(`CommandHandler > Loaded ${commands.length} Commands`))
        commands.forEach((cmd) => {
            const command = require(cmd[0]);
            client.commands.set(command.name, command);
        });
    })
        .on("disconnect", () => console.log(chalk.hex('#FF8800')("API > Disconnecting")))
        .on("reconnecting", () => console.log(chalk.yellow("API > Reconnecting")))
        .on("error", (e) => console.log(e))
        .on("warn", (info) => console.log(info))

    mongoose.connect(config.mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    }).then(() => {
        console.log(chalk.yellow("MongoDB > Connected"));
    }).catch((err) => {
        console.log(chalk.red("MongoDB > Error" + "\n" + err));
    });
}

client.on("message", (message) => {
    if((message.content === "<@816960110735392798>") || (message.content === "<@!816960110735392798>"))
    {
      message.channel.send(`My Prefix is \`\`${config.prefix}\`\``)
    };
})


load();

if (config.dev.debug) {
    createTable(client.commands)
}

client.login(config.token)