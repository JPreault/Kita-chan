const {EmbedBuilder} = require('@discordjs/builders');
const {GuildMember} = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        const {user, guild} = member;
        const welcomeChannel = member.guild.channels.cache.get('1055999803332513873');
        const welcomeMessage = `**Welcome <@${member.id}> to the server!**`;

        const adminChannel = member.guild.channels.cache.get('1056000810191962213');
        const welcomeEmbed = new EmbedBuilder()
        .setTitle("**New Member !**")
        .setDescription(welcomeMessage)
        .setColor(0x27b4db)
        .addFields({name: 'Total Members', value: `${guild.memberCount}`})
        .setTimestamp();

        const memberRole = '1056005076356964363';

        welcomeChannel.send({content: welcomeMessage});
        adminChannel.send({embeds: [welcomeEmbed]});
        member.roles.add(memberRole);
    },
};