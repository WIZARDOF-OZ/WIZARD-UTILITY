const Discord = require('discord.js');
const client = new Discord.Client()

module.exports = {
    name:"leave",
    aliases:["disconnect"],
    description:"Leave the voice channel",
    category:"Music",

    execute: async(client, message, args) => {
        if(!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');


        await message.member.voice.channel.leave()


        if(message.guild.me.permissions.toArray().includes('ADD_REACTION')){

            try{
                message.react('🎙')
            }
            catch(err){
                console.log(err);
            }
        }
    }
}