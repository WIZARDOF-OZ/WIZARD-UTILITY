const Discord = require('discord.js');
const client = new Discord.Client()

module.exports = {
    name:"connect",
    aliases:["join"],
    description:"Join the voice channel",
    category:"Music",

    execute: async(client, message, args) => {
        if(!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
        let permarry = message.guild.me.permissions.toArray()

        if(!permarry.includes('VIEW_CHANNEL')) return message.channel.send(`There  was an error  trying to  join your voice channel || Can't see your voice channel !`)
        if(!permarry.includes('VIEW_CHANNEL')) return message.send(`There  was an error  trying to  join your voice channel || Can't connect your voice channel !`)



try{
         message.member.voice.channel.join()

}
catch(err){
message.channel.send(`There  was an error  trying to  join your  voice channel || Make sure that i have proper permissions !`)
}
        if(message.guild.me.permissions.toArray().includes('ADD_REACTION')){
        
                  try{
                message.react('🎥')
                
            }
            catch(err){
                console.log(err);
            }
        }
    }
}