module.exports = {
    name: 'kill',
    aliases: [],
    description: 'To kill the bot.',
    category: "Bot Dev",
    ownerOnly: true,
    execute: async (client, message, args, text, instance) => {
        await message.channel.send("👌")
        client.destroy();
    }
}