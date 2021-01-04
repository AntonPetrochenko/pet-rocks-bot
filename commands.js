const sqlite3 = require("sqlite3")
const discordjs = require("discord.js")
const namegen = require("unique-names-generator")

/**
 * 
 * @param {sqlite3.Database} dbo 
 * @param {discordjs.User} sender 
 */
function adopt(dbo,sender) {
    console.log({
        senderId: sender.id,
        senderName: sender.username,
    })
    console.log("Test command ran")
    //dbo.prepare("INSERT INTO rocks").run((error) => {console.log(error)})
}

/*
\`!rocks adopt\` to adopt a new rock (in moderation!)
\`!rocks feed Rock Name\` to feed your pet rock
\`!rocks return Rock Name\` to return your pet rock to the shelter

This bot will not: 
- remind you to feed your pet rock
- tell you when your rock had ran away due to starvation

This bot will:
- tell you when somebody else's rock turned up on your doorstep. For that to happen, you need to already own a rock

If you forgot your pet rock's name, consider it lost.
To make the Pet Rock Bot experience more immersive, do not write your pet rock's name in a way that can be easily searched with Discord's message search.
*/
commands = {
    adopt: adopt,
    feed: () => {}
}

module.exports = commands