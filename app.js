/*
|--------------------------------------------------------------------------
| Define Variables
|--------------------------------------------------------------------------
|
| First, we will import our libs, define our
| variables and read the config to make the bot running.
|
*/
const { Client, Intents } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
var dateFormat = require('dateformat');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES] });
const config = require("./config.json");
const token = config.token;

/*
|--------------------------------------------------------------------------
| Load all Plugins
|--------------------------------------------------------------------------
|
| Here we will bring the plugins to life. This happens
| through our autoloader.js file. Its job is it to find all plugins
| on its own and include them to the main application.
| Additionally, we need to prepare the interactions event for the
| incomming plugins and register all imported commands.
|
*/
var plugins = require("./plugins/autoload.js");
var commands = plugins.commands.map(command => command.toJSON());;

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(config.client_id, config.server_id), { body: commands })
	.then(() => console.log('[DEBUG] Successfully registered application commands.'))
	.catch(console.error);

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
    plugins.process(interaction);
});

/*
|--------------------------------------------------------------------------
| Logging
|--------------------------------------------------------------------------
|
| In case something goes wrong, this bot is able to print
| everything into our logfile.
|
*/
client.on("error", (e) => console.error(`[ERROR] [${dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")}] ${e}`));
client.on("warn", (e) => console.warn(`[WARNING] [${dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")}] ${e}`));
client.on("debug", (e) => console.warn(`[DEBUG] [${dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")}] ${e}`));

/*
|--------------------------------------------------------------------------
| Create the Client Ready Event
|--------------------------------------------------------------------------
|
| This events fires, when the bot gets ready. It is necessary for the
| online log window of our dashboard, where the startup options
| will be displayed too. These options get printed into our logfile
| at this position.
|
*/
client.on("ready", () => {
    fs.writeFile('status.txt', '1', function (err) {
	    if (err) return console.error(`[ERROR] [${dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")}] ${err}`);
    });
    console.log(`[${dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")}] Bot fired up: ${client.user.username}`); 
    /* Keeps the token in logfile secret */
    config['token'] = "[CENSORED]";
    /* Printing config to log */
    console.log(config);
    /* Updating all stats channels */
    updateChannel();
    /* Repeating it over and over */
    setInterval(function () {
        updateChannel();
    }, 1800000);
});

/*
|--------------------------------------------------------------------------
| Bot Core Function
|--------------------------------------------------------------------------
|
| The core function of this bot is to update the discord stats.
| This will happen in the main core file here. Every other
| function will be counted as modular extension, also called
| a "plugin".
|
*/
function updateChannel() {
    try {  
        /* Selecting the discord server */
        const guild = client.guilds.cache.get(config.server_id);
        /* Selecting the channels */
        const memberCountChannel = guild.channels.cache.get(config.member_channel);
        const mpCountChannel = guild.channels.cache.get(config.mp_channel);
        /* Counting the members */
        let totalMembers = guild.members.cache.filter(member => member.roles.cache.has(config.party_member_role)).size;
        let mpMembers = guild.members.cache.filter(member => member.roles.cache.has(config.parliament_member_role)).size;
        /* Giving a heartbeat (still-alive-signal) to logfile (used as debug here) */
        console.log(`[HEARTBEAT] [${dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")}] <Total ${totalMembers}> <MP ${mpMembers}>`);
        /* Trying to update channelnames */ 
        memberCountChannel.setName('Total Members: ' + totalMembers);   
        mpCountChannel.setName('In Parliament: ' + mpMembers);
    } catch (e) {
        console.error(`[ERROR] [${dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")}] ${e}`);
    }    
}

/*
|--------------------------------------------------------------------------
| Create the Instance
|--------------------------------------------------------------------------
|
| At this place the magic happens. We will log in to the Discord
| Application Programming Interface with our token and client secret.
| From this point, the bot will appear online.
|
*/
client.login(token);
