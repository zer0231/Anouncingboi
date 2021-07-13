require('dotenv').config();
const path = require('path');
const prefex = "boss";
const bot = require('./Bot/bot');
const express = require('express');
const port = process.env.PORT;
const fs = require('fs');
const request = require('request');
const app = express();
const authRoutes = require('./routes/authRoutes');


// view engine
app.set('view engine', 'ejs');

app.listen(process.env.PORT || port,function(){
  console.log("server running: "+port);



bot.on('ready',()=>{
 
//starting the bot
console.info(`Logged in as ${bot.user.tag}!`);

bot.on('message',msg=>{
  //listen to messages send in the server
  msg.content = msg.content.toLowerCase();
  if(msg.content.startsWith(prefex))
  {
    prefex_length = prefex.length + 1;
    command = msg.content
    msg_length = command.length
    command = command.slice(prefex_length,msg_length);
    console.log("."+command+".");
    var words = msg.content.split(' ');
    command = words[1];
    switch (command) {
      case 'help':
      help_txt="\n-use 'boss shout <Message>' to send to everyone.\n-use 'boss say <Message>' to send message and delete instantly.\n-use 'boss wallpaperplz' on wallpaper channel to make json of those images\n-use 'boss joke' for any random joke \n-use 'boss darkjoke1' to get dark jokes\n-use 'boss darkjoke2' to get twopart jokes\n-use 'boss explain <word>' to get meaning"
        msg.channel.send(help_txt);
        break;

      case 'say':
      message_announcement = msg.content.slice(prefex_length+4,msg_length);
      msg.channel.send(message_announcement).then(msgResponse =>{msg.delete({timeout: 1000})}).catch((err)=>{console.log(err)});
      break;

      case 'shout':
      message_announcement = msg.content.slice(prefex_length+6,msg_length);
      msg.channel.send("@everyone"+message_announcement).then(msgResponse =>{msg.delete({timeout: 1000})}).catch((err)=>{console.log(err)});
      // msg.delete(1000); //Supposed to delete message
      break;

// BEGINING OF WALLPAPERPLZ COMMAND
//Fak this shit use firebase
      case 'wallpaperplz':
      msg.delete(500);
      if(msg.channel.id === "799548978328764446"){
        msg.channel.fetchMessages().then(async messages => {
          let finalArray = [];
          const putInArray = async (data) => finalArray.push(data);
          for (const msg of messages.array().reverse())
          if(msg.author.bot != true && msg.attachments.size > 0)
          {
            msg.attachments.forEach(attachment => {
              // do something with the attachment
              const url = attachment.url;
               putInArray(url);
              console.log(url);
            });
          }
          var txt = '{"wallpapers":[';
          finalArray.forEach(makeValidJson);
          txt= txt + "]}";

    function attachIsImage(msgAttach) {
      var url = msgAttach.url;
      console.log(url);
      //True if this url is a png image.
      return url;
    }

    function makeValidJson(value, index, array) {
      txt= txt + '{"image_url":"'+value+'"},';
    }
    txt = txt.slice(0,-4);
    var json = txt+'}]}';
    fs.writeFile('./public/wallpaper.json', json, (err) => {
        if (!err) {
            console.log('done');
        }
    });
      msg.channel.send("http://anouncingboi.herokuapp.com/wallpaper.json updated");
    });
    }
    else
    {
      msg.channel.send('Use this on wallpaper channel only')
    .then(msg => {
      msg.delete({ timeout: 10000 })
    })
    .catch(console.error);
    }
      break;
// END OF WALLPAPERPLZ COMMAND

case 'joke':
var url = "https://v2.jokeapi.dev/joke/Any"
request(url,{json:true},(err,res,body)=>{
  if(err)
  {
    console.log(err);
  }
  else{
    if(body.type == "twopart")
    {
        msg.channel.send(body.setup);
        msg.channel.send("||"+body.delivery+"||")
    }
    else{
    msg.channel.send(body.joke);
  }
}
});
break;
case 'darkjoke1':
var url = "https://v2.jokeapi.dev/joke/Dark?type=single";
request(url,{json:true},(err,res,body)=>{
  if(err)
  {
    console.log(err);
  }
  else{
    msg.channel.send(body.joke);
  }
});

break;
    case 'darkjoke2':
    var url = "https://v2.jokeapi.dev/joke/Dark?type=twopart";
    request(url,{json:true},(err,res,body)=>{
      if(err)
      {
        console.log(err);
      }
      else{
        msg.channel.send(body.setup);
        msg.channel.send("||"+body.delivery+"||")
      }
    });

    break;

    case 'nasaimage':
      var url = "https://api.nasa.gov/planetary/apod?api_key="+process.env.NASA_API+"&count=1"
      request(url,{json:true},(err,res,body)=>{
        if(err)
        {
          console.log(err);
        }
        else{
          // console.log(body[0].hdurl)

     msg.channel.send(body[0].hdurl)
        }
      });
      break;


      case 'explain':
        word = msg.content.slice(prefex_length+8,msg_length);
        var url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/";
        url = url+word;
        request(url,{json:true},(err,res,body)=>{
          if(err)
          {
            console.log(err);
          }
          else{
            if(body.hasOwnProperty('title'))
            {    
              msg.channel.send("Didnt find that !!!");       
             }
            else{
              msg.channel.send("***"+body[0].word+"***"+"\n>>> Meaning: *"+body[0].meanings[0].definitions[0].definition+"*\nExample: *"+body[0].meanings[0].definitions[0].example+"*");
         
             }
          }
        });
        break;

      default:
      msg.channel.send("oops didnt get that try 'boss help'");

    }


  }


});

});

});

//middleware
app.use(express.static('public'));
app.use(express.json());

// routes
app.use(authRoutes);

app.get('/wallpaper.json', function(req, res){
  res.sendFile(path.join(__dirname+'/public/wallpaper.json'));
});


