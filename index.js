// rollbot source

const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 3600;

function countTimer() {
    ++totalSeconds;
}

client.once("ready", () => {
    console.log('Ready!');
    client.user.setActivity(`Rolling bitches`);
});

client.on("message", async message => {

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g); // get all arguments
    const command = args.shift().toLowerCase(); // get command (= first arg)

    console.log(message.content);
    console.log(message.createdAt)
    console.log(message.author.username + " - " + message.author.id);
    console.log("----------");

    var rolesColl = message.guild.roles;
    console.log(rolesColl);

    // basic ping
    if (command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }

    // start roll process
    if (command === "roll") {
        if (totalSeconds > 3600){
            var timesrun = 0;
            var interval = setInterval (function () {
                timesrun+=1;
                message.channel.send(".w");
                if (timesrun === 10){
                    clearInterval(interval);
                }
              }, 1 * 2000);
              totalSeconds = 0;
        } else {
            message.channel.send(`Still ${Math.floor((3600-totalSeconds)/60)} minutes left.`);
        }
    }

    // check timer
    if (command === "timer") {
        if ((Math.floor((3600-totalSeconds)/60)) <= 0) {
            message.channel.send(`Good to go.`);
        } else {
            message.channel.send(`Still ${Math.floor((3600-totalSeconds)/60)} minutes left.`);
        }
    }
});

// wait function
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

// final - dont change
client.login(config.token);
