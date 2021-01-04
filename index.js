// Copyright 2021 Anton Petrochenko
// This file is a part of the Pet Rock Bot
// This code is licensed under MIT license (see LICENSE for details)

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
    console.log('Received a message')
    if (message.content.match(/^!rocks/)) {
        var relatedUser = {}
        var command = message.content.match(/^!rocks (.*)/)[1]
        if (commands[command]) {
            commands[command](rocksDatabase,message,{...command})
        } else {
            message.reply(`Unknown command \`${command}\`! \`!rocks help\` for a quick rundown.`)
        }
    }
})

discordClient.login(petRocksConfig.token).then((foo) => {
    console.log(foo)
})