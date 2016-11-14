"use strict";

/* Requires */
const fs = require("fs");
const Eris = require("eris");
var config;
if (!fs.existsSync("./config.json")) {
    console.log("config.json doesnt exist, using example config.")
    config = require("./config-example.json")
} else {
    config = require("./config.json")
}


/* Definitions/Variables */
const bot = new Eris(config["Required Inputs"].token);

/* Actual Bot */
bot.on("ready", () => {
    console.log("Chocolate Discord Bot: [" + bot.user.username + "]")
    console.log(`   ${config["General Info"].ready}`)
    console.log(`   ${bot.guilds.size} servers!`)
});
bot.connect()