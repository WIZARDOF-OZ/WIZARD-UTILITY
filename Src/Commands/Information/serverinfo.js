const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};
const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};
const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydeny: 'Sydeny',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};

module.exports = {
    name: "serverinfo",
    aliases: ["si"],
    cooldown: 0,
    memberPermissions: [],
    category: "Information",
    execute: async (client, message, args, text, instance) => {

        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;

        const embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setAuthor(message.author.username, message.author.displayAvatarURL({dyanmic : true}))
            .setDescription(`<a:badge:837259871156961320>Shows the server info for **${message.guild.name}**<a:badge:837259871156961320>`)
            .setColor("RANDOM")
            .addField('General Info', [
                `<a:shinydot:837258278085066803>**ID:** ${message.guild.id}`,
                `<a:shinydot:837258278085066803>**Name:** ${message.guild.name}`,
                `<a:shinydot:837258278085066803>**Owner:** ${message.guild.owner} (${message.guild.owner.id})`,
                `\u200b`
            ])
            .addField('Boost Info', [
                `<a:shinydot:837258278085066803>**Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
                `<a:shinydot:837258278085066803>**Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
                `\u200b`
            ])
            .addField('Counters', [
                `<a:shinydot:837258278085066803>**Role Count:** ${roles.length}`,
                `<a:shinydot:837258278085066803>**Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
                ` <a:shinydot:837258278085066803>**Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
                `<a:shinydot:837258278085066803>**Bots:** ${members.filter(member => member.user.bot).size}`,
                `<a:shinydot:837258278085066803>**Humans:** ${members.filter(member => !member.user.bot).size}`,
                `<a:shinydot:837258278085066803>**Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
                `<a:shinydot:837258278085066803>**Emoji Count:** ${emojis.size}`,
                `<a:shinydot:837258278085066803>**Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
                `\u200b`
            ])
            .addField('Additional Info', [
                `<a:shinydot:837258278085066803>**Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
                `<a:shinydot:837258278085066803>**Verification Level:**  ${verificationLevels[message.guild.verificationLevel]}`,
                `<a:shinydot:837258278085066803>**Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
                `<a:shinydot:837258278085066803>**Region:** ${regions[message.guild.region]}`,
                `\u200b`
            ])
            .setTimestamp()
            .setFooter(`${message.guild.name}`);
        message.channel.send(embed);
    }
}