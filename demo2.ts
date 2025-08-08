import { Bot } from "https://deno.land/x/grammy@v1.36.3/mod.ts";

import "jsr:@std/dotenv/load";


// 创建一个 `Bot` 类的实例，并将你的 bot token 传给它。
const bot = new Bot(Deno.env.get("BOT_TOKEN")!); // <-- 把你的 bot token 放在 "" 之间

// 你现在可以在你的 bot 对象 `bot` 上注册监听器。
// 当用户向你的 bot 发送消息时， grammY 将调用已注册的监听器。

// 对 /start 命令作出反应
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
// 处理其他的消息
bot.on("message", (ctx) => {
    console.log(`当前接受消息的来源id: ${ctx.chatId}`)
    console.log(`当前消息的发送人id: ${ctx.from.id}`)
    ctx.reply("你好!")
});

// 现在，你已经确定了将如何处理信息，可以开始运行你的 bot。
// 这将连接到 Telegram 服务器并等待消息。

const me = await bot.api.getMe();
console.log(`机器人名称:${me.username}`)

const myAccountId = 6711190671;
const groupId = -1002757459232;

// 私聊发送消息
// await bot.api.sendMessage(myAccountId,'我是你的机器人')

// 发送群聊消息
// await bot.api.sendMessage(groupId,'我是群聊机器人')

// 启动你的 bot
bot.start();