const  { Client, GatewayIntentBits, Partials, Collection} = require("discord.js")

const { Guilds, GuildMembers, GuildMessages} = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember, Channel} = Partials

const {loadEvents} = require("./Handlers/eventHandler")
const {loadCommands} = require("./Handlers/commandHandler")

const {DisTube} = require("distube");
const {SpotifyPlugin} = require("@distube/spotify")

require('dotenv').config();

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
})

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
})

client.commands = new Collection();

module.exports = client;

client.login(process.env.TOKEN).then( async ()=>{
    //client.db = await loadDataBase();
    //client.db.getConnection( (err, connection) => {
    //    if(err) throw err; // Not connected
    //    console.log(' DB Connected')
    //})
    loadEvents(client);
    loadCommands(client);
})
