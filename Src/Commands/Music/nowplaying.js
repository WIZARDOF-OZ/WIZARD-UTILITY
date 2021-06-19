const { MessageEmbed, Client, Message } = require('discord.js');

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    description: "Shows the current playing song.",
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

        const current = player.queue.current;
        if (!current) message.channel.send(new MessageEmbed().setColor(instance.color.error).setDescription(`${instance.emoji.error} Nothing is playing right now.`));

        const embed = new MessageEmbed()
        .setDescription(`[${current.title}](${current.uri}) - [ ${current.requester.toString()} ]`)
        .setColor(instance.color.info);
        message.channel.send(embed);
    }
}