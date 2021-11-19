/*
|--------------------------------------------------------------------------
| Import all plugins
|--------------------------------------------------------------------------
|
| First we need to load all required files and save their instances.
| They will include commands, functions, variables, and so on....
| Additionally, we need to create the command list for the 
| core application, called "app.js", from where we will include this file.
|
*/
const { SlashCommandBuilder } = require('@discordjs/builders');

var commands = [];
var instances = {};
require("fs").readdirSync(__dirname + "/").forEach(function(file) {
    let pluginName = file.split(".")[0];
    if(pluginName == "autoload") return;
    let pluginInstance = require(__dirname + "/" + file);
    commands.push(new SlashCommandBuilder().setName(pluginName).setDescription(pluginInstance.description));
    instances[pluginName] = pluginInstance;
});

module.exports.commands = commands;

module.exports.process = (interaction) => {
    commands.forEach(command => {
        if(interaction.commandName === command.name) {
            let instance = instances[interaction.commandName];
            let channelRestriction = (instance.channel !== undefined) ? true : false;
            if(!channelRestriction) { instance.handleInteraction(interaction); return; }
            if(interaction.channelId === instance.channel) instance.handleInteraction(interaction); else interaction.reply({ content: `:no_entry: This command can only be executed in <#${instance.channel}>`, ephemeral: true });
        }
    })
}