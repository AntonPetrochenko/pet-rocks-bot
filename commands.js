// Copyright 2021 Anton Petrochenko
// This code is licensed under MIT license (see LICENSE for details)

const sqlite3 = require("sqlite3")
const discordjs = require("discord.js")
const namegen = require("unique-names-generator")
const { uniqueNamesGenerator, adjectives, colors, names, countries } = require("unique-names-generator")

//Comamnd handler signature is:
// function handler(message: discordjs.Message, dbo: sqlite3.Database)

/**
 * A basic test command, which logs the message sender details
 * @param {sqlite3.Database} dbo Database object
 * @param {discordjs.Message} message Message
 */
function test(message,dbo) {
    console.log({
        senderId: message.author.id,
        senderName: message.author.username,
    })
    var rock = rockCommandHelper(message)
    if (rock) {
        message.reply(`You've asked for ${rock}. We generated a name: ${generateRockName()}`)
    } else {
        return
    }
}

/**
 * The help command which details the bot's usage
 * @param {discordjs.Message} message 
 */
function help(message) {
    message.reply(`\`!rocks adopt\` to adopt a new rock (in moderation!)
\`!rocks feed Rock Name\` to feed your pet rock
\`!rocks return Rock Name\` to return your pet rock to the shelter

This bot will not: 
- remind you to feed your pet rock
- tell you when your rock had ran away due to starvation

This bot will:
- tell you when somebody else's rock turned up on your doorstep. For that to happen, you need to have already owned a pet rock at any point or are currently owning any pet rocks
- delete \`!rocks\` command calls that include your pet rock's name as a parameter after 24 hours
- delete it's own replies that include your pet rock's name after 24 hours

If you forgot your pet rock's name, consider it lost.
To make the Pet Rock Bot experience more immersive, do not write your pet rock's name in a way that can be easily searched with Discord's message search. Any other place is fine, though.`)
}

/**
 * Helper function to use in commands that require a rock's name as an argument.
 * Extracts the rock name from a command.
 * Will automatically reply with a warning saying that a rock name is required.
 * The null returned from this function should be used to stop the command from running.
 * @param {discordjs.Message} message The command to extract rock name from
 * @returns {string|null} The rock name, or null if none is specified.
 */
function rockCommandHelper(message) {
    //The dumb but bulletproof way to get the rock's name is to split the command by whitespace, shift it twice and join the rest also by whitespace.
    var command = message.content
    var commandArray = command.split(" ")
    commandArray.shift()
    commandArray.shift()
    var rockName = commandArray.join(" ")
    if (rockName.length < 1) {
        message.reply('You must specify a rock name for this command to work.')
        return null
    } else {
        message.delete()
        return rockName
    }
}

/**
 * Helper function to generate names for rocks.
 * @returns {string} A name for a rock.
 */
function generateRockName() {
    return uniqueNamesGenerator({separator: " ", style: "capital", dictionaries: [colors, names]}) + " the " + uniqueNamesGenerator({separator: " ", style: "capital", dictionaries: [adjectives ]}) + " of " + uniqueNamesGenerator({separator: " ", style: "capital", dictionaries: [countries]})
}



commands = {
    test,
    help
}

module.exports = commands