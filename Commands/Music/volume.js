const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji} = require("discord.js")
const client = require("../../main")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Set the volume of the bot")
        .addIntegerOption(option => 
            option.setName("volume")
                .setDescription("10 = 10%")
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true)  
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), //only allow for admin users
        

    async execute(interaction){
        const { options, member, guild } = interaction;

        const volume = options.getInteger("volume");
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
                       
            client.distube.setVolume(voiceChannel, volume);
            return interaction.reply({ content: ` Volume = ${volume}%`});

        } catch  (err){
            console.log(err);

            embed.setColor("Red").setDescription("Bug :/");

            return interaction.reply({ embeds: [embed], ephemeral: true});  
        }
    }
}