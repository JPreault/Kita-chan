const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji} = require("discord.js")
const client = require("../../main")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a song")
        .addStringOption(option =>
            option.setName("query")
            .setDescription('name or url')
            .setRequired(true)
        ),
        

    async execute(interaction){
        const { options, member, guild, channel } = interaction;

        const query = options.getString("query");
        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();

        if(!voiceChannel){
            embed.setColor("Red").setDescription("Join a voice channel first");
            return interaction.reply({ embeds: [embed], ephemeral: true});
        }

        if(member.voice.channelId != guild.members.me.voice.channelId && guild.members.me.voice.channelId) {
            embed.setColor("Red").setDescription(`Alredy playing : <#${guild.members.me.voice.channelId}>`);
            return interaction.reply({ embeds: [embed], ephemeral: true});
        }

        try{
            console.log(`Song Add: ${query}`)
            client.distube.play(voiceChannel, query, {textChannel: channel, member: member});
            return interaction.reply({ content: " Song Add"});

        } catch  (err){
            console.log(err);

            embed.setColor("Red").setDescription("Bug :/");

            return interaction.reply({ embeds: [embed], ephemeral: true});
        }
    }
}