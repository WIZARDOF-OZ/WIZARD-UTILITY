const Discord = require('discord.js')
const fs = require("fs");
const config = require("../../config.js");
const { PREFIX, prefix } =  require("../../config.js")
const db = require('old-wio.db');
const { stripIndents } = require("common-tags");
const { support } = require("../../JSON/Invite_Config.json");
const client = new Discord.Client()

module.exports = {

    name: "help",
    description: "Help Menu",
    category: 'utility',
    usage: "1) !help \n2) !help [module name]\n3) !help [command (name or alias)]",
    example: "1) !help\n2) !help util\n3) !help ban",
    aliases: ['h'],

execute: async (client, message, args) => {
    const WIZARDOFOZᶫᵒᵛᵉᵧₒᵤ = await client.users.cache.get("583666642010112000");
    const { author, channel } = message;
    let commands = message.client.commands.array();
    let matchedPrefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                PREFIX = PREFIX
            } 
        } catch (e) {
            console.log(e)
    };
    
    try {
      
   
        let Categories = ["Admin", "Fun", "Images", "BotDev", "Information", "Moderation", "Music", "Levelling", "Giveaway", "Suggestion", "Warning"],
        AllCommands = [];
    
    const Emotes = {
        Admin: "⚙️Admin",
        Fun: "🙂Fun",
        Images: "🎨 Images",
        Music: "🔍Music",
        Information: "📚Info",
        Moderation: "🔧Mod",
        BotDev: "🤖BotDev",
        Levelling: "🔧Levelling",
        Giveaway: "🔧Giveaways",
        Suggestion: "🔧Suggest",
        Warning: "🔧Warn"
    };
let catList = []
 //  for (let i = 0; i < Categories.length; i++) {
    //    catList.push(Categories[i])
   //   const Cmds = await bot.commands.filter(x => x.category === Categories[i]).map(x => "`" + x.name + "`").join(", ")
  //   AllCommands.push(`\n\n**${Emotes[Categories[i]]}**\n\`\`${Cmds}\`\``);
 //   };
    for (let i = 0; i < Categories.length; i++) {
        const Cmds = await client.commands.filter(C => C.category === Categories[i]).array().map(C => C.name).sort((a, b) => a < b ? -1 : 1).join(", ");
       AllCommands.push(`\n\n**${Emotes[Categories[i]]}**\n\`\`\`${Cmds}\`\`\``);
   };
    
  

const Description = `My Prefix For **${message.guild.name}** Is **${PREFIX}**\n\nFor More Command Information, Type The Following Command:\n**${prefix}help <command Name> or** <@${client.user.id}> **help <command name>**`;

const Embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("Commands", message.author.avatarURL({
        dynamic: true
    }))
    .setDescription(Description + AllCommands.join("") + "" + "\n\n" + "**Links -**" + ` [Join Support](${support}) • [Invite Me](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
    .setFooter(`Coded with 🍵 by ${WIZARDOFOZᶫᵒᵛᵉᵧₒᵤ.tag}`, WIZARDOFOZᶫᵒᵛᵉᵧₒᵤ.displayAvatarURL({ dynamic: true }))

if (!args[0]) return message.channel.send(Embed);

else {
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
    .setThumbnail(client.user.displayAvatarURL())

    let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
    if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`${PREFIX}help\` For the List Of the Commands!**`))
    command = command.config

    embed.setDescription(stripIndents`
    ** Command -** \`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\`\n
    ** Description -** \`${command.description || "No Description provided."}\`\n
    ** Usage -** [   \`${command.usage ? `${command.usage}` : "No Usage"}\`   ]\n
    ** Examples -** \`${command.example ? `${command.example}` : "No Examples Found"}\`\n
    ** Aliases -** [ \`${command.aliases ? command.aliases.join(" , ") : "None."}\` ]`)
    embed.setFooter(message.guild.name, message.guild.iconURL())

    return message.channel.send(embed)
};
} catch (e) {
  console.log(e);
};

    

}
}
