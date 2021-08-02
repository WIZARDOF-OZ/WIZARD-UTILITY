const Discord = require('discord.js');
const Client = new Discord.Client();
module.exports = {
    name:"embed",
    category:"Fun",

    execute: async(Client, message, args, text, instance) => {
        if(args.length === 0) { 
        const errorembed = new Discord.MessageEmbed()
        .setColor(instance.color.error)
        .setDescription(`${instance.emoji.error}Please Provide Some Text`)
        await message.inlineReply({embed: errorembed})
        }
const embed = new Discord.MessageEmbed()
        .setTitle(`Embed`)
        .setColor(`RANDOM`)
        .setThumbnail(message.guild.iconURL({dynamic:true}))
        .setDescription(message.content.substring(6))
        .setFooter(`REQUESTED BY ${message.author.tag}`,`${message.author.displayAvatarURL({dynamic:true})}`)
        .setTimestamp();
       await message.inlineReply({
           embed: embed
       })
                
    }
}