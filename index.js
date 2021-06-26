

const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hey there!'))

app.listen(port, () =>
console.log(chalk.cyan(`Your app is listening a http://localhost:${port}`))
);



require("dotenv").config();

    const DiscordJS = require("discord.js"),
    mongoose = require("mongoose"),
    DisTube = require('distube');
    getFiles = require("./Src/Functions/Base/getFiles"),
    chalk = require("chalk"),
    createTable = require("./Src/Functions/Base/createTable"),
    loadFunctions = require('./Src/Functions');

const client = new DiscordJS.Client({
    messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
    partials: ['CHANNEL', 'MESSAGE', 'REACTION', 'GUILD_MEMBER', 'USER']
    
});

const { format } = require("./function.js")
const { PREFIX } = require("./config.js")
const config = require("./config.js");
const  db = require("old-wio.db");
const fs = require("fs");

  

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



load();
require("./distube-handler")(client);
if (config.dev.debug) {
    createTable(client.commands)
}

client.on("ready" , () => {
    console.log(chalk.red(`${client.user.tag} is ready`))
})
client.on("message" , async message => {
 
    
    if (message.author.bot || !message.guild || message.webhookID) return;
    
    let PREFIX = await db.fetch(`prefix_${message.guild.id}`);
 
  
  const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);
       
    if (message.content.match(mentionRegex)) {
      message.channel.send(
        new DiscordJS.MessageEmbed()
        .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
        .setDescription(`Hey <@${message.author.id}>, My prefix for this guild is \`\`\`${PREFIX}\`\`\`.Use \`\`\`${PREFIX}help\`\`\` or <@${client.user.id}> help to get a list of commands`)
         .setColor("RANDOM")
         .setFooter(`Requested by ${message.author.username}`)
         .setTimestamp()
)}



if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
    const info = db.fetch(`afk-${message.author.id}+${message.guild.id}`)
    await db.delete(`afk-${message.author.id}+${message.guild.id}`)
    await db.delete(`aftime-${message.author.id}+${message.guild.id}`)
    message.channel.send(`Welcome back ${message.author.username}, Great to see you!!`)
}
//checking for mentions
if(message.mentions.members.first()) {
    if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
      const reason = db.fetch(`afk-${message.mentions.members.first().id}+${message.guild.id}`);
      let time = db.fetch(`aftime-${message.mentions.members.first().id}+${message.guild.id}`);
            time = Date.now() - time;
       return message.channel.send(`**${message.mentions.members.first().user.username} is now afk - ${reason} - ${format(
                    time
                )} ago**`);
    }
}

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);

    if(!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);
     Prefix = matchedPrefix;

    
    if(!message.content.startsWith(Prefix)) return;
    
     if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS"))
        return message.reply("**:x: I am missing the Permission to `EMBED_LINKS`**");
})





client.login(config.token)