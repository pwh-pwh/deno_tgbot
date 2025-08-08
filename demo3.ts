import { Bot } from "https://deno.land/x/grammy@v1.36.3/mod.ts";

import "jsr:@std/dotenv/load";


// 创建一个 `Bot` 类的实例，并将你的 bot token 传给它。
const bot = new Bot(Deno.env.get("BOT_TOKEN")!); // <-- 把你的 bot token 放在 "" 之间

// 设置菜单命令
bot.api.setMyCommands([
  { command: "start", description: "启动机器人" },
  { command: "ping", description: "Ping 机器人" },
]);


// 现在，你已经确定了将如何处理信息，可以开始运行你的 bot。
// 这将连接到 Telegram 服务器并等待消息。

const me = await bot.api.getMe();
console.log(`机器人名称:${me.username}`)

const myAccountId = 6711190671;
const groupId = -1002757459232;

// 引用回复
bot.hears("ping", async (ctx) => {
  // `reply` 是同一聊天中 `sendMessage` 的别名（见下一节）。
  await ctx.reply("pong", {
    // `reply_parameters` 指定实际的回复哪一条信息。
    reply_parameters: { message_id: ctx.msg.message_id },
  });
});

// 回复md消息
await bot.api.sendMessage(
  "@jjdd123i",
  "*Hi\\!* _Welcome_ to [grammY](https://grammy.dev)\\.",
  { parse_mode: "MarkdownV2" },
);

// 回复html消息
await bot.api.sendMessage(
  "@jjdd123i",
  '<b>Hi!</b> <i>Welcome</i> to tgbot.',
  { parse_mode: "HTML" },
);

// 强制回复
bot.command("start", async (ctx) => {
  await ctx.reply("Hi! I can only read messages that explicitly reply to me!", {
    // Make Telegram clients automatically show a reply interface to the user.
    reply_markup: { force_reply: true },
  });
});

// 私聊发送消息
// await bot.api.sendMessage(myAccountId,'我是你的机器人')

// 发送群聊消息
// await bot.api.sendMessage(groupId,'我是群聊机器人')

// 启动你的 bot
bot.start();