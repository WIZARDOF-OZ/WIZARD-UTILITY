const { MessageEmbed, Client, Message } = require('discord.js');
const distube = require('distube')

module.exports = {
    name: "stop",
    aliases: [],
    description: "Stops the player.",
    cooldown: 0,
    category: "Music",
    memberPermissions: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @param {String} text 
     */
    execute: async (client, message, args, text, instance) => {
        
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');

        let queue = await client.distube.getQueue(message);

        if(queue) {
            client.distube.stop(message)
    
            message.channel.send('DONE!')
        } else if (!queue) {
            return
        };
    }
        
    }
