const { Client} = require("discord.js");

module.exports = {
    name: "ready",
    once: true,
    async execute(client){        
        console.log(`\n\t${client.user.username} is now online !\n\n`);
    },
};