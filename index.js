// Copyright 2021 Anton Petrochenko
// This code is licensed under MIT license (see LICENSE for details)

/** Where the fun happens. This function is called hourly to tick down rocks' saturation levels and run other funny hourly events. */
function main() {
    console.log("Tick started!")
    rocksDatabase.serialize(() => {
        rocksDatabase.run("UPDATE rocks SET saturation = saturation - 1",function (err) {
            console.log(`Updated ${this.changes} rocks.`)
        })
    })
}

var maintenanceScheduled = false

function setMaintenanceMode() {
    maintenanceScheduled = true
}

module.exports = {
    main,
    setMaintenanceMode
}

const discordjs = require("discord.js")
const petRocksConfig = require("./config.json")

const commands = require("./commands")

const discordClient = new discordjs.Client()
const sqliteClient = require("sqlite3").verbose()
const rocksDatabase = new sqliteClient.Database("./rocks.db")

discordClient.on("ready",() => {
    console.log("I'm alive!")
})




discordClient.on('message',(message) => {
    if (message.content.match(/^!rocks/)) {
        if (!maintenanceScheduled) {
            var command = message.content.match(/^!rocks (.*?)(?= |$)/)[1]
            if (commands[command]) {
                commands[command](message,rocksDatabase)
            } else {
                message.reply(`Unknown command \`${command}\`! \`!rocks help\` for a quick rundown.`)
            }
        } else {
            message.reply(":rock: We're under maintenance! Time has been temporarily frozen for your rocks.")
        }
    }
})

discordClient.login(petRocksConfig.token).then((foo) => {
    console.log("Logged in to Discord")
    setInterval(main,1000*60*60)
}).catch((err) => {
    console.error("Discord login rejected.")
    console.error(err)
})

/**
 * @typedef {Object} messageDeletionPoolEntry
 * @property {Number} guildId
 * @property {Number} channelId
 * @property {Number} messageId
 * @property {Number} touchFlag
 */

/**
 * @typedef {Object} rock
 * @property {Number} id
 * @property {string} name
 * @property {Number} saturation
 * @property {string} ownerId
 * @property {string} ownerLastKnownName
 * @property {(0|1)} isCurrentlyOwned
 */
