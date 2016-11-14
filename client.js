"use strict";

/* Requires */
const fs = require("fs");
const Eris = require("eris");
const http = require("./source/request");
const packageinfo = require("./source/bot.json");

var config;
if (!fs.existsSync("./config.json")) {
    console.log("config.json doesnt exist, using example config.")
    config = require("./config-example.json")
} else {
    config = require("./config.json")
}


/* Definitions/Variables */
const request = new http();
const bot = new Eris(config["Required Inputs"].token);
const prefix = config["Required Inputs"].prefix;

/* Actual Bot */
bot.on("ready", () => {
    console.log("Chocolate Discord Bot: [" + bot.user.username + "]")
    console.log(`   ${config["General Info"].ready}`)
    console.log(`   ${bot.guilds.size} servers!`)
});

bot.on("messageCreate", (msg) => {
    var message = msg.content;
    var guild = msg.guild;
    var member = msg.member
    var sender = msg.author;
    var channel = msg.channel;
    
    /* Commands */
    
    if (message.startsWith(`${prefix}ping`)) {
        let start = Date.now();
        bot.createMessage(channel.id, "Pong.").then((m) => {
            let end = Date.now();
            let res = end - start;
            bot.editMessage(channel.id, m.id, "Pong. `" + res + "ms`, Successfully running **Chocolate Bot v" + packageinfo.version + "**!")
        })
    }
    
    
    
    /* Owner Commands */
    if (sender.id === config["Required Inputs"].ownerID) {
        if (message.startsWith(`${prefix}eval `)) {
            let argument = message.split(`${prefix}eval`).join("");
            try {
                let evl = eval(argument);
                bot.createMessage(channel.id, `${"```js\n"}
input: ${argument}

output: ${evl}
${"\n```"}`)
            } catch (e) {
                bot.createMessage(channel.id, `${"```js\n"}
input: ${argument}

output: ${e}
${"\n```"}`)
            }
        }
    }
});
bot.connect()