const Discord =require('discord.js');

module.exports.investor_get = (req, res) => {
  res.render('investor');
}

module.exports.investor_post = async (req, res) => {
const {companyName,totalShare,forPublic,price,openingDate} = req.body;
  //console.log(req.body)

console.log(companyName,totalShare,forPublic,price,openingDate);
// res.send('new signup');

// var bot = import('../Bot/bot');
var message = "\n```Company Name: "+companyName+"\nTotal Share: "+totalShare+"\nFor Public: "+forPublic+"\nPrice: "+price+"\nOpening Date: "+openingDate+"```";
https://discord.com/api/webhooks/

var webtoken = "LKZz9NyK1D2N8PPLsCFsnxUHvf3znkj7gfJpeSQfsJFyni3Soy2Xm5qKEAJ6ZtvjeIZu";
var webhookId = "864547626044096512"
var webhook = new Discord.WebhookClient(webhookId, webtoken);
webhook.send(message)
  .catch(console.error);

// bot.on('ready',()=>{
//   //starting the bot
//   //console.info(`Logged in as ${bot.user.tag}!`);
// const channelID = "817559555097624597";
// bot.channels.cache.get(channelID).send(message);
// });

}

module.exports.home_get = (req,res) =>{
  res.render('home');
}

