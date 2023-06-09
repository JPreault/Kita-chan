const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji} = require("discord.js")
const client = require("../../main")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip a song"),
        

    async execute(interaction){
        const { member, guild } = interaction;

        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();

        if(!voiceChannel){
            embed.setColor("Red").setDescription("Join a voice channel first");
            return interaction.reply({ embeds: [embed], ephemeral: true});
        }

        if(!member.voice.channelId == guild.members.me.voice.channelId) {
            embed.setColor("Red").setDescription(`Alredy playing : <#${guild.members.me.voice.channelId}>`);
            return interaction.reply({ embeds: [embed], ephemeral: true});
        }

        try{
            
            const queue = await client.distube.getQueue(voiceChannel);
            if(!queue) {
                embed.setColor("Red").setDescription("There is no queue");
                return interaction.reply({ embeds: [embed], ephemeral: true});
            }
            
            await queue.skip(voiceChannel);
            embed.setColor("Blue").setDescription(`Skip`);
            return interaction.reply({ embeds: [embed], ephemeral: true});

        } catch  (err){
            console.log(err);

            embed.setColor("Red").setDescription("Bug :/");

            return interaction.reply({ embeds: [embed], ephemeral: true});  
        }
    }
}