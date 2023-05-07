const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("pong")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), //only allow for admin users
    
    execute(interaction) {
        interaction.reply({content: "pong ", ephemeral: false}); //Ephemeral => only visible for yourself
    },
};