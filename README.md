# Discord Bot
## About this Project
This project was intentionally created for a closed discord server of a party of this simulation. The simulation is a political simulation, started by [@politicsandfacts](https://www.instagram.com/politicsandfacts/), where hundreds of political interested people simulate an own country with an own government and laws. Read more about it and its incredible details on their [wiki page](https://nyrmod.fandom.com/wiki/Islands_of_Nyrmod_Wiki) or [instagram page](https://www.instagram.com/parliamentofnyrmod/?hl=de). The party this bot was written for is called "The Pirate Party of Nyrmod". I was part of this virtual simulated party and developed most of their systems. They have got an own website, a blog, a tool for recruitment, an instagram account and so on... The real pirate party of course knows about this party. Some real pirates, like the vice-chair of the real PPI organization is also part of this party. The bots task was and still is: In first line counting members by their roles to keep the statistics updated. Additionally it introduces also a plugin system, where I can manually program new modular commands, the bot will register and process.

## Installation Guide

### 0. Requirements

1. Any environment ([LAMP](https://de.wikipedia.org/wiki/LAMP_%28Softwarepaket%29), ....)
2. Discord - [website](https://discord.com)
3. `git` - [more details](https://git-scm.com/downloads)
4. `npm` - [more details](https://nodejs.org/en/download/)
5. `nodejs` - [more details](https://nodejs.org/en/download/)
6. `screen` (optional) - [more details](https://linuxize.com/post/how-to-use-linux-screen/)
7. `nvm` (recommended for nodejs installation) - [more details](https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/)

### 1. Download Repository
You can do this by multiple ways. When using the desktop application, you can just give it the repo url and download it. For terminal-based systems, you will need to do it with the `git` command.
```bash
git clone https://github.com/david-prv/discord-bot.git <target-dir>
```
### 2. Download dependencies
Once you have this done, you'll need to download all the dependencies since they are not uploaded to this repository. Do do so, you can use `npm`, the node package manager.
```bash
cd <project-dir> && npm i
```
Wait for the package manager to be done and you are ready to go.

### 3. Setup

To run this bot on your own system, you'll need to adjust the configuration file `config.json`. First you need an own bot. Here is a tutorial about [How to create a discord bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot). Follow the steps, copy your secret token, and replace the placeholder in the config file with it.

As a next step, you will need to update the channel ids. It will be necessary to have the developer mode in discord for your client enabled. Here is a tutorial about [How to enable developer mode](https://discord.com/developers/docs/game-sdk/store#:~:text=Open%20up%20the%20Discord%20app,and%20enter%20your%20application%20ID). Now copy the needed ids, replace them in the config, and you are done.

### 4. Start the Bot

I recommend using the `screen` module. I'm personally very used to use this module on my ubuntu server system and I can promise: it is one of the most stable and best engineered multiplexer I know. An other alternative would be `tmux`.

With a multiplexer you are able to run this application in a separate virtual terminal. In case you don't want to have separate terminals, try another module called `forever`.

Assuming that you will use `screen`, follow these steps:
```bash
cd <project-dir>
screen -S my_discord_bot node app.js >> logfile.txt
```
Of course you can put this into an extra `start.sh` file. Make sure it has the right permissions to be executed then.
The commands shown above will force the application to write its output into an extra file. This has the advantage that you will be able to read logs forever. They won't get lost. Especially when it comes to bugfixing and debugging, this will be very helpful. But this is of course optional.

Here are some commands you may need:
```bash
screen -ls # lists all active screens with ids
screen -d -r <id> # attaches to a screen by id
screen -r <name> # attaches to a screen by name
screen -r <name> -X quit # will close a screen by name 
```
When attached to a screen, do not use CTRL+C to detach, except you want to terminate the screen. Use CTRL+A+D instead. It will keep the screen running and detach you from it.
