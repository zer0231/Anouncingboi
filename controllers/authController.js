module.exports.investor_get = (req, res) => {
  res.render('investor');
}

module.exports.investor_post = async (req, res) => {
const {companyName,totalShare,forPublic,price,openingDate} = req.body;
  //console.log(req.body)

console.log(companyName,totalShare,forPublic,price,openingDate);
// res.send('new signup');

var bot = import('../Bot/bot');

bot.on('ready',()=>{
  //starting the bot
  //console.info(`Logged in as ${bot.user.tag}!`);
const channelID = "817559555097624597";
bot.channels.cache.get(channelID).send("@everyone \n```Company Name: "+companyName+"\nTotal Share: "+totalShare+"\nFor Public: "+forPublic+"\nPrice: "+price+"\nOpening Date: "+openingDate+"```");
});

}

module.exports.home_get = (req,res) =>{
  res.render('home');
}

