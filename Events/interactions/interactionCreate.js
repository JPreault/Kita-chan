const {CommandInteraction} = require("discord.js");

module.exports = {
    name: "interactionCreate",

    async execute(interaction, client){

        if(!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if(!command) return interaction.reply({content: "outdated command"});
        
        command.execute(interaction, client);

    },
};