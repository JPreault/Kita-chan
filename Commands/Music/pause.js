const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji} = require("discord.js")
const client = require("../../main")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pause a song"),
        

    async execute(interaction){
        const { member, guild } = interaction;

        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();


        if(!voiceChannel){
            embed.setColor("Red").setDescription("You must be in a voice channel to execute music commands");
            return interaction.reply({ embeds: [embed], ephemeral: true});
        }

        if(!member.voice.channelId == guild.members.me.voice.channelId) {
            embed.setColor("Red").setDescription(`You can't use the music player as it is already active is <#${guild.members.me.voice.channelId}>`);
            return interaction.reply({ embeds: [embed], ephemeral: true});
        }

        try{

            const queue = await client.distube.getQueue(voiceChannel);
            if(!queue) {
                embed.setColor("Red").setDescription("There is no active queue");
                return interaction.reply({ embeds: [embed], ephemeral: true});
            }
            
            await queue.pause(voiceChannel);
            embed.setColor("Orange").setDescription("The song has been paused");
            console.log(`${member.user.username} à mis en pause`);
            return interaction.reply({ embeds: [embed], ephemeral: true});

        } catch  (err){
            console.log(err);

            embed.setColor("Red").setDescription("Somthing went wrong...");

            return interaction.reply({ embeds: [embed], ephemeral: true});  
        }
    }
}