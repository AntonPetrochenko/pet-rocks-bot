// Copyright 2021 Anton Petrochenko
// This code is licensed under MIT license (see LICENSE for details)

const sqlite3 = require("sqlite3")
const discordjs = require("discord.js")
const namegen = require("unique-names-generator")
const { uniqueNamesGenerator, adjectives, colors, names, countries } = require("unique-names-generator")

const replyMessages = require("./messageTemplates")

//Comamnd handler signature is:
// function handler(incomingMessage: discordjs.Message, dbo: sqlite3.Database, discord)

/**
 * A basic test command, which logs the message sender details
 * @param {sqlite3.Database} dbo Database object
 * @param {discordjs.Message} incomingMessage Message
 * @param {discordjs.Client} discordClient Discord client that received this command
 */
function test(incomingMessage,dbo,discordClient) {
    console.log({
        senderId: incomingMessage.author.id,
        senderName: incomingMessage.author.username,
    })
    var rock = rockCommandHelper(incomingMessage)
    if (rock) {
        replyAndDelete(incomingMessage,`You've asked for ${rock}. We generated a name: ${generateRockName()}. This message will be deleted in 1 hour`)
    } else {
        return
    }
}

/**
 * Finds a homeless rock or creates a new rock and assigns it to the user
 * @param {discordjs.Message} incomingMessage Message
 * @param {sqlite3.Database} dbo Database object
 */
function adopt(incomingMessage,dbo) {
    //First, let's look for any rocks with no current owner
    //dbo.run()
}

/**
 * The help command which details the bot's usage
 * @param {discordjs.Message} message 
 */
function help(message) {
    message.reply(`Pet Rocks Bot is a "game" of responsibility.

\`!rocks adopt\` to adopt a new rock (in moderation, don't become a rock maniac)
\`!rocks feed Rock Name\` to feed your pet rock
\`!rocks return Rock Name\` to return your pet rock to the shelter

This bot will not: 
- remind you to feed your pet rock
- tell you when your rock had ran away due to neglect
- give you a list of your pet rocks

This bot will:
- tell you when somebody else's rock turned up on your doorstep. For that to happen, you need to have already owned a pet rock at any point or are currently owning any pet rocks.
- delete \`!rocks\` command calls that include your pet rock's name as a parameter after 1 hour
- delete it's own replies that include your pet rock's name after 1 hour

If you forgot your pet rock's name, consider it lost.
To make the Pet Rock Bot experience more immersive, do not deliberately write your pet rock's name in a way that can be easily searched with Discord's message search. Any other way and place is fine, though, such as writing them in an MS Word document and talking about the rocks with your friends.`)
}

function replyAndDelete(incomingMessage,content) {
    incomingMessage.reply(`You've asked for ${rock}. We generated a name: ${generateRockName()}. This message will be deleted in 1 hour`).then((outgoingMessage) => {
        incomingMessage.delete({timeout: 1000 * 60 * 60})
        outgoingMessage.delete({timeout: 1000 * 60 * 60})
    })
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
        return rockName
    }
}

function testAdoptMessage(message) {
    var rock = rockCommandHelper(message)
    if (rock) {
       if (replyMessages.adoptionMessages[Number(rock)]) {
            message.reply(replyMessages.adoptionMessages[Number(rock)](generateRockName()) + "\n\nBe sure to feed it 3 times a day.")
       } else {
           message.reply("No such message. The messages count from 0")
       }
    } else {
        return
    }
}

function testFeedMessage(message) {
    var rock = rockCommandHelper(message)
    if (rock) {
       if (replyMessages.feedMessages[Number(rock)]) {
            message.reply(replyMessages.feedMessages[Number(rock)](generateRockName()))
       } else {
        message.reply("No such message. The messages count from 0")
    }
    } else {
        return
    }
}

function testFindMessage(message) {
    var rock = rockCommandHelper(message)
    if (rock) {
       if (replyMessages.findMessages[Number(rock)]) {
            message.reply(replyMessages.findMessages[Number(rock)](generateRockName()) + "\n\nYou can either `!rocks keep` it or `!rocks reject` it")
       } else {
        message.reply("No such message. The messages count from 0")
    }
    } else {
        return
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
    help,
    testAdoptMessage,
    testFeedMessage,
    testFindMessage
}

module.exports = commands