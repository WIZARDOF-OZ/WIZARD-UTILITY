const { MessageEmbed } = require('discord.js');
const moment = require("moment");

module.exports = {
    name: "whois",
    aliases: ["userinfo", "ui"],
    cooldown: 0,
    memberPermissions: [],
    category: "Information",
    execute: async (client, message, args, text, instance) => {
        var permissions = [];
        let acknowledgements = 'None';
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.member;
    
    
        if (member.hasPermission("KICK_MEMBERS")) {
            permissions.push("Kick Members");
        }

        if (member.hasPermission("BAN_MEMBERS")) {
            permissions.push("Ban Members");
        }

        if (member.hasPermission("ADMINISTRATOR")) {
            permissions.push("Administrator");
        }

        if (member.hasPermission("MANAGE_MESSAGES")) {
            permissions.push("Manage Messages");
        }

        if (member.hasPermission("MANAGE_CHANNELS")) {
            permissions.push("Manage Channels");
        }

        if (member.hasPermission("MENTION_EVERYONE")) {
            permissions.push("Mention Everyone");
        }

        if (member.hasPermission("MANAGE_NICKNAMES")) {
            permissions.push("Manage Nicknames");
        }

        if (member.hasPermission("MANAGE_ROLES")) {
            permissions.push("Manage Roles");
        }

        if (member.hasPermission("MANAGE_WEBHOOKS")) {
            permissions.push("Manage Webhooks");
        }

        if (member.hasPermission("MANAGE_EMOJIS")) {
            permissions.push("Manage Emojis");
        }

        if (permissions.length == 0) {
            permissions.push("No Key Permissions Found");
        }

        if (member.user.id == message.guild.ownerID) {
            acknowledgements = 'Server Owner';
        
        }
        let target = message.mentions.users.first() || message.guild.members.cache.get(args[0]) 
        if(!target) target = message.author;
        const flags = {
            DISCORD_EMPLOYEE: 'Discord Employee <:DiscordStaff:721437079300604035>  ',
            DISCORD_PARTNER: 'Discord Partner <a:Discord_Partner:840623482457948201>  ',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1) <:bug_hunter_badge:840623658211999774> ',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2) <:Bug_Hunter_Gold:840623542713712641>',
         HYPESQUAD_EVENTS: 'HypeSquad Events<a:Hypesquad:837258853627461632> ',
            HOUSE_BRAVERY: 'House of Bravery <:bravery:840625416531476500> ',
            HOUSE_BRILLIANCE: 'House of Brilliance <:brilliance:840626463006523402> ',
            HOUSE_BALANCE: 'House of Balance <:balance:840626515544506408>',
            EARLY_SUPPORTER: 'Early Supporter <:EarlySupporterBadge:840624148015218689> ',
            TEAM_USER: 'Team User <:DiscordStaff:837752668918251600> ',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot <:verifiedBot:840624681303277599> ',
            VERIFIED_DEVELOPER: 'Verified Bot Developer <:VerifiedBotDeveloper:840624514802647053> '
      };
        const userFlags = target.flags.toArray();    

        let nickname = target.nickname !== undefined && target.nickname !== null ? target.nickname: "NONE";

        const embed = new MessageEmbed()
            .setDescription(`<@${member.user.id}>`)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
            .setColor(member.displayHexColor)
            .setFooter(`ID: ${member.user.id}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .addField('Joined at: ', `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
            .addField("Created at: ", `${moment(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
            .addField(`Badges : ${userFlags.length ? userFlags.map(flag => flags[flag]).join('.'): 'NONE'}`)
            .addField("Is a bot?",`${target.bot}`, true)
            .addField("Nickname",`${nickname}`,true)
            .addField(`Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`, `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(" **|** ") || "No Roles"}`, false)
            .addField("Permissions: ", `${permissions.join(', ')}`, false)
            .addField("Acknowledgements: ", `${acknowledgements}`, true)
        message.channel.send(embed);
    }
}