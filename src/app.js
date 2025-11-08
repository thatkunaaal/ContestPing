const { Bot } = require("grammy");
const { Menu } = require("@grammyjs/menu");
const {getTodayContest, formatList , filteredContest} = require('./utils/utils');

require("dotenv").config();

const bot = new Bot(process.env.BOT_TOKEN);


bot.command("start",async (ctx) => {
  await ctx.reply(`Hi ${ctx.from.first_name}👋. Welcome to ContestPing!`);
  await ctx.reply(`Where we dont let you miss any coding contest...`);
  ctx.reply(`List of the commands that you can enter here:
        1) /start -> Start the bot
        2) /help -> help you to navigate
        3) /list_contest -> List down all the today contest
        4) /select_platform -> Select the plaform and it will show you all the contest that is happening on it today.
        `)
});


bot.command("list_contest", async (ctx) => {
  ctx.reply("Fetching today's contests...");
  let res = await getTodayContest();
  res = formatList(res);
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

const menu = new Menu('my-menu-identifier')
  .text('Leetcode',async ctx => {
    const platform = "Leetcode";
    const allContestList = await getTodayContest();
    const filterContest = filteredContest(allContestList,platform);
    const res = formatList(filterContest);
    let outputArr = [];

    for(const ele of res){
        let s = `\n
            Event: ${ele.event},
            link: ${ele.link},
            duration: ${ele.duration},
            start time: ${ele.startTime}\n
        `;
        outputArr.push(s);
    }

  let outputStr = outputArr.join("");
  if(outputStr.length == 0)
    outputStr = `No contest on ${platform} for today.`
  ctx.reply(`Today's ${platform} contest: \n${outputStr}`);
  }).row()
  .text('Codeforces', async ctx => {
    const platform = "Codeforces";
    const allContestList = await getTodayContest();
    const filterContest = filteredContest(allContestList,platform);
    const res = formatList(filterContest);
    let outputArr = [];

    for(const ele of res){
        let s = `\n
            Event: ${ele.event},
            link: ${ele.link},
            duration: ${ele.duration},
            start time: ${ele.startTime}\n
        `;
        outputArr.push(s);
    }

  let outputStr = outputArr.join("");
  if(outputStr.length == 0)
    outputStr = `No contest on ${platform} for today.`
  ctx.reply(`Today's ${platform} contest: \n${outputStr}`);
  }).row()
  .text('Codechef',  async ctx => {
    const platform = "Codechef";
    const allContestList = await getTodayContest();
    const filterContest = filteredContest(allContestList,platform);
    const res = formatList(filterContest);
    let outputArr = [];

    for(const ele of res){
        let s = `\n
            Event: ${ele.event},
            link: ${ele.link},
            duration: ${ele.duration},
            start time: ${ele.startTime}\n
        `;
        outputArr.push(s);
    }

  let outputStr = outputArr.join("");
  if(outputStr.length == 0)
    outputStr = `No contest on ${platform} for today.`
  ctx.reply(`Today's ${platform} contest: \n${outputStr}`);
  }).row()
  .text('AtCoder',   async ctx => {
    const platform = "AtCoder";
    const allContestList = await getTodayContest();
    const filterContest = filteredContest(allContestList,platform);
    const res = formatList(filterContest);
    let outputArr = [];

    for(const ele of res){
        let s = `\n
            Event: ${ele.event},
            link: ${ele.link},
            duration: ${ele.duration},
            start time: ${ele.startTime}\n
        `;
        outputArr.push(s);
    }

  let outputStr = outputArr.join("");
  if(outputStr.length == 0)
    outputStr = `No contest on ${platform} for today.`
  ctx.reply(`Today's ${platform} contest: \n${outputStr}`);
  })

bot.use(menu)

bot.command("help",(ctx)=>{
    ctx.reply('Use "/" to navigate from the menu of commands')
})

bot.api.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "help", description: "help you to navigate" },
  { command: "list_contest", description: "List down all the today contest" },
  {command: "select_platform", description: "Select the plaform and it will show you all the contest that is happening on it today."}
])



bot.command("select_platform",async (ctx)=>{

    await ctx.reply('Select the platform on which you want to keep an eye 👀:', {
    reply_markup: menu
  })
})

bot.on(":text",(ctx)=>{
    ctx.reply(`It looks like you have enter something wrongs☹️
        List of the commands that you can enter here:
        1) /start -> Start the bot
        2) /help -> help you to navigate
        3) /list_contest -> List down all the today contest
        4) /select_platform -> Select the plaform and it will show you all the contest that is happening on it today.
        `)
})

bot.start();


