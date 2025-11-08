const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const {getTodayContest } = require('./utils/utils');

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`Welcome to ContestPing!`);
  ctx.reply(`Where we dont let you miss any coding contest...`);
});

bot.telegram.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "help", description: "List all the command" },
  { command: "list_contest", description: "List down all the today contest" },
  {command: "select_contest", description: "Select the contest that you want to see"}
]);

bot.help((ctx) => ctx.reply('Use "/" to navigate from the menu of commands'));


bot.command("list_contest", async (ctx) => {
  ctx.reply("Fetching today's contests...");
  let res = await getTodayContest();
  // res = JSON.stringify(res);
  let outputArr = [];
  for(const ele of res){
    let s = `\n
        Event: ${ele.event},
        link: ${ele.link},
        host: ${ele.host},
        duration: ${ele.duration},
        start time: ${ele.startTime}\n
    `;
    outputArr.push(s);
  }
  const outputStr = outputArr.join("");
  ctx.reply(`Today's contest: ${outputStr}`);
});

bot.command("select_contest",async (ctx)=>{

})

bot.launch();


