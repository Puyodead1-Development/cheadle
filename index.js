const Discord = require("discord.js");
const fs = require("fs");
let cheadles = require("./cheadle.json");
const config = require("./config.json");
const client = new Discord.Client();

let cheadle = [];
let last = 0;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  cheadle = cheadles;
});

client.on("message", (msg) => {
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().includes("don cheadle")) {
    var randomNumber = Math.floor(Math.random() * cheadle.length);
    if (randomNumber === last) {
      randomNumber = Math.floor(Math.random() * cheadle.length);
    }
    let embed = new Discord.RichEmbed()
      .setAuthor("Don Cheadle")
      .addField("Image Number", randomNumber)
      .setImage(cheadle[randomNumber]);
    msg.channel.send(embed);
    last = randomNumber;
  }
  if (msg.content.startsWith("addcheadle")) {
    msg.delete();
    const args = msg.content
      .slice(10)
      .trim()
      .split(/ +/g);
    if (args[0]) {
      cheadle.push(args[0]);
      fs.writeFile("cheadle.json", JSON.stringify(cheadle), function(err) {
        if (err) throw err;
      });
      return msg.channel.send(`Added "${args[0]}"`).then((mssg) => {
        mssg.delete(5000);
      });
    } else {
      return msg.channel.send(
        "Please specify a url to a direct img ending in .jpg or .png!"
      );
    }
  }
});

client.login(config.token);
