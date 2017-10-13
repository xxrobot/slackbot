'use strict';

var messages = [
    'Giddyup',
    'Isosceles. You know, I love the name Isosceles. If I had a kid, I would name him Isosceles. Isosceles Kramer.',
    'You know what you are? You’re an anti-dentite! It starts with a few jokes and slurs… ‘HEY DENTY!’ Then you will say that dentists should have their own schools!',
    'Have you ever met a proctologist? They usually have a very good sense of humor. You meet a proctologist at a party, don’t walk away. Plant yourself there because you will hear the funniest stories you’ve ever heard.',
    'What do you think Junior? You think these hands – they’ve been soaking in Ivory Liquid?',
    'http://i.giphy.com/aMh59aKR8vjdC.gif'
];

var placesToEat = [
  'Komol',
  'Komol Thai',
  'Komol Thai Restaurant'
];

var settings = require('./settings.json');
var Bot = require('slackbots');

function getRand(arrayName){
  return arrayName[Math.floor(Math.random() * arrayName.length)]; 
}



var bot = new Bot(settings);

bot.on( 'message', function(message) {

    var me = this.users.filter(function (user) {
        return user.name === 'kanye2';
    })[0];

    if( message.type === 'message' && Boolean(message.text) ) {


        //This tests to see if i was mentioned
        if( message.text.toLowerCase().indexOf('kanye2') > -1
              || message.text.toLowerCase().indexOf(this.name) > -1
              || message.text.indexOf(me.id) > -1) {

          //im dumb and will respond to myself, infinite loop
          if( message.user !== me.id ) {
              var params = {
                  link_names: 1,
                  as_user: true
              };

              //who sent the message?
              var fromUser = this.users.filter(function(user) {
                  return user.id === message.user;
              })[0]['name'];

              //what channel was the message sent in?
              var channel = this.channels.filter(function (item) {
                  return item.id === message.channel;
              })[0];


              //talking about food
              if( message.text.toLowerCase().indexOf('eat') > -1){
                bot.postMessageToChannel(channel.name, '@' + fromUser + ' You should eat at ' + getRand(placesToEat), params);
              }

              //finally sends the message
              // bot.postMessageToChannel(channel.name, '@' + fromUser + ' ' + getRand(messages), params);
          }

        }
    }
});