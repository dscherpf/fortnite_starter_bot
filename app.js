// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const config = require("./config.json");

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('Bot is running.');
});

var helpMessage = "**Fortnite Starter** ```#fns - random starting location``` ```#fnf - list favorite locations``` ```#fnfs - random favorite location``` ```#fnf add [favorite] - add favorite location``` ```#fnf remove [favorite] - remove favorite location```"

var lzArray = [
  '[A5] **Snobby Shores**',
  '[B1] **Junk Junction**',
  '[B2] **Haunted Hills**',
  '[B7] **Greasy Grove**',
  '[C2] busted town',
  '[C3] **Pleasant Park**',
  '[C7] **Greasy Grove**',
  '[D2] Motel',
  '[D4] **Loot Lake**',
  '[D5] **Tilted Towers**',
  '[D7] **Shifty Shafts**',
  '[D8] little town',
  '[D9] **Flush Factory**',
  '[E2] **Anarchy Acres**',
  '[E4] **Loot Lake**',
  '[E9] Warehouses',
  '[F2] **Anarchy Acres**',
  '[F5] **Dusty Depot**',
  '[F6] couple houses',
  '[F7] **Salty Springs**',
  '[F8] **Fatal Fields**',
  '[F10] Southern Reach',
  '[G3] **Tomato Town**',
  '[G6] Factory',
  '[G8] **Fatal Fields**',
  '[H5] Container Store',
  '[H6] **Retail Row**',
  '[H8] The Prison',
  '[I2] Old faithfull',
  '[I3] **Wailing Woods**',
  '[I6] Junk yard',
  '[I8] **Moisty Mire**',
  '[J2] THE TOWER',
  '[J4] **Lonely Lodge**',
  '[J6] Track'
];

var favLZs = [];
var emptyFavs = "You don't have any favorites saved. Use '#fnf add' to save a new favorite."

var random = function(array) {
  var rand = array[Math.floor(Math.random() * array.length)];
  return rand;
};






// Create an event listener for messages
client.on('message', message => {
  if (message.author.bot) return;
  if (message.content === '#fns help'){
      message.channel.send( helpMessage );
  } else if (message.content === '#fns') {
      message.channel.send( random(lzArray), {
        tts: true
    });
  } else if(message.content === '#fnf'){
      if (favLZs.length > 0) {
        message.channel.send(favLZs);
      } else {
        message.channel.send(emptyFavs)
      };
  } else if(message.content === '#fnfs'){
      if (favLZs.length > 0) {
        message.channel.send( random(favLZs), {
          tts: true
        });
      } else {
        message.channel.send(emptyFavs)
      };
  } else if(message.content.includes("#fnf add")){
      var sliceFav = message.content.slice(9);
      if (favLZs.includes(sliceFav)){
        message.channel.send("That's already a favorite!");
      } else {
        favLZs.push(sliceFav);
        message.channel.send("Added " + "\"" + sliceFav + "\"" + " as a favorite.");
      };
  } else if(message.content.includes("#fnf remove")){
    var sliceFav = message.content.slice(12);
    if (favLZs.includes(sliceFav)){
      var indexFav = favLZs.indexOf(sliceFav);
      if (indexFav > -1) {
        favLZs.splice(indexFav, 1)
      };
      message.channel.send("Removed " + "\"" + sliceFav + "\"" + " from favorites.");
    } else {
      message.channel.send("That's not saved as a favorite!");
    };
  }

});

// Log our bot in
client.login(config.token);
