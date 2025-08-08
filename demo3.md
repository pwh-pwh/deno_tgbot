# Telegram Bot 交互进阶 (Demo 3)

本教程基于 [Demo 2](demo2.md) 构建，将引导您了解更多与用户交互的方式，包括设置菜单命令、引用回复、发送格式化消息以及强制用户回复。

## 准备工作

请确保您已经熟悉 [Demo 2](demo2.md) 中的概念。

## 代码解析

这是我们的第三个 bot 示例代码 (`demo3.ts`)：

```typescript
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
```

### 新增功能说明

1.  **设置菜单命令**:
    *   我们使用 `bot.api.setMyCommands` 方法来为您的机器人设置一个命令列表。这些命令会显示在 Telegram 用户界面的菜单按钮中，方便用户快速访问。
    *   每个命令都包含 `command`（命令本身，不带 `/`）和 `description`（命令的简短描述）。

2.  **引用回复**:
    *   当用户发送 "ping" 时，机器人会使用 `ctx.reply("pong", ...)` 来回复。
    *   关键在于 `reply_parameters` 对象，它的 `message_id: ctx.msg.message_id` 属性告诉 Telegram 这条 "pong" 消息是针对用户发送的 "ping" 消息的直接回复。

3.  **发送格式化消息**:
    *   grammY 支持使用 Markdown 或 HTML 来格式化您的消息文本，从而实现加粗、斜体、链接等效果。
    *   **MarkdownV2**: 通过设置 `{ parse_mode: "MarkdownV2" }`，您可以使用 Markdown 语法。注意，某些特殊字符（如 `.` `!` `-`）需要用 `\` 进行转义。
    *   **HTML**: 通过设置 `{ parse_mode: "HTML" }`，您可以使用常见的 HTML 标签（如 `<b>`, `<i>`, `<a>`）来格式化文本。

4.  **强制回复**:
    *   在 `/start` 命令的处理器中，我们通过在 `reply` 方法的选项中加入 `reply_markup: { force_reply: true }` 来实现强制回复。
    *   这会向用户的 Telegram 客户端发送一个指令，自动弹出一个回复界面，强烈暗示用户需要回复这条消息。这对于创建多步骤对话非常有用。

## 如何运行

运行方式与之前的示例相同：

```shell
deno run --allow-net --allow-env demo3.ts
```

启动后，您可以尝试以下操作：
*   点击输入框旁的菜单按钮，您会看到 "start" 和 "ping" 命令。
*   发送 "ping"，观察机器人的引用回复。
*   执行 `/start` 命令，看看强制回复的用户界面是怎样的。
*   检查发送给 `@jjdd123i` 的格式化消息（请确保替换为您自己的用户名或ID进行测试）。