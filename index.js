

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

    const bot = new DiscordJS.Client({
        messageCacheLifetime: 60,
      fetchAllMembers: false,
      messageCacheMaxSize: 10,
      restTimeOffset: 0,
      restWsBridgetimeout: 100,
      disableEveryone: true,
        partials: ['CHANNEL', 'MESSAGE', 'REACTION', 'GUILD_MEMBER', 'USER']
        
    });
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
const { PREFIX , prefix } = require("./config.js")
const config = require("./config.js");
const wb = require("quick.db")
const  db = require("old-wio.db");
const fs = require("fs");
const Enmap = require("enmap");
client.queue2 = new Map();
client.queue3 = new Map();
client.queue = new Map();
client.games = new Map();

  

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
    const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
    await db.delete(`afk-${message.author.id}+${message.guild.id}`)
    message.reply(`Your afk status have been removed (${info})`)
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


    
    if(!message.content.startsWith(prefix)) return;
    
     if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS"))
        return message.reply("**:x: I am missing the Permission to `EMBED_LINKS`**");
  
        let args = message.content
        .slice(matchedPrefix.length)
        .trim()
        .split(/ +/g);
      let cmd = args.shift().toLowerCase();
      
      if (cmd.length === 0) return;
    
      let cmdx = wb.fetch(`cmd_${message.guild.id}`)
    
      if (cmdx) {
        let cmdy = cmdx.find(x => x.name === cmd)
        if (cmdy) message.channel.send(cmdy.responce.replace(/{user}/g, `${message.author}`)
    
         .replace(/{user_tag}/g, `${message.author.tag}`)
            .replace(/{user_name}/g, `${message.author.username}`)
            .replace(/{user_ID}/g, `${message.author.id}`)
            .replace(/{guild_name}/g, `${message.guild.name}`)
            .replace(/{guild_ID}/g, `${message.guild.id}`)
            .replace(/{memberCount}/g, `${message.guild.memberCount}`)
            .replace(/{size}/g, `${message.guild.memberCount}`)
            .replace(/{guild}/g, `${message.guild.name}`)
            .replace(/{member_createdAtAgo}/g, `${moment(message.author.createdTimestamp).fromNow()}`)
            .replace(/{member_createdAt}/g, `${moment(message.author.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`)
      )};
      
      let ops = {
                queue2: bot.queue2,
                queue: bot.queue,
                queue3: bot.queue3,
                games: bot.games
            }
    
      let command =
        bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
      
      if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
    
      if (!command)
        return;
    
       if (command) {
         command.run(bot, message, args, ops);
       } else {
         command.run(bot, message, args)
       }
       
})





client.login(config.token)