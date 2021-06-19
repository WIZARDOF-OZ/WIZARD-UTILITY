const { MessageEmbed, Client, Message } = require('discord.js');

module.exports = {
    name: "volume",
    aliases: ["vol"],
    usage: "<0-150>",
    description: "Sets the player's volume.",
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
        const player = client.music.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(instance.color.error).setDescription(`${instance.emoji.error} Nothing is playing right now.`));
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed().setColor(instance.color.error).setDescription(`${instance.emoji.error} You have to be in a voice channel.`));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(instance.color.error).setDescription(`${instance.emoji.error} You have to be in a voice channel, same as mine.`));
        if (!args[0]) return message.channel.send(new MessageEmbed().setColor(instance.color.error).setDescription(`${instance.emoji.error} Provide a number between 0 - 150.`));
        const vol = parseInt(args[0]);
        if (isNaN(vol)) return message.channel.send(new MessageEmbed().setColor(instance.color.error).setDescription(`${instance.emoji.error} Provide a number between 0 - 150.`));
        if (vol < 0) return message.channel.send(new MessageEmbed().setColor(instance.color.error).setDescription(`${instance.emoji.error} Provide a number between 0 - 150.`));
        if (vol > 150) return message.channel.send(new MessageEmbed().setColor(instance.color.error).setDescription(`${instance.emoji.error} Provide a number between 0 - 150.`));
        player.setVolume(vol)
        message.channel.send(new MessageEmbed().setColor(instance.color.success).setDescription(`${instance.emoji.success} Volume set to **${vol}**.`));
    }
}