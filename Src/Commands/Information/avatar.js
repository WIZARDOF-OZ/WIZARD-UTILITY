const {Client , MessageEmbed} = require('discord.js');
const client = new Client();


module.exports = {
name: "av",
aliases: ['avatar'],
category: "Information",



execute: (client,message,args)=>{
    let target =  message.mentions.members.first() || message.member;
    if(!target) return message.author;
   const avembed = new MessageEmbed()
   .setTitle(`AVATAR OF ${target.user.tag}`)
   .setColor(target.roles.highest.hexColor)
   .setImage(target.user.displayAvatarURL({dynamic : true , size: 4096 ,format:"png"}))
   .setFooter(`Command is used by ${message.author.tag}`,`${message.author.displayAvatarURL({dynamic:true})}`)
   .setTimestamp()
   message.channel.send(target.roles.highest.hexColor)
    message.channel.send(avembed)
}
}