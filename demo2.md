# Telegram Bot 进阶教程 (Demo 2)

本教程是 [基础教程](demo1.md) 的进阶版，将向您展示如何获取更多消息详情、记录信息，以及如何主动向用户或群组发送消息。

## 准备工作

请确保您已经完成了 [基础教程](demo1.md) 的所有步骤。

## 代码解析

这是我们的第二个 bot 示例代码 (`demo2.ts`)：

```typescript
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
```

### 新增功能说明

1.  **获取消息与Bot的详细信息**:
    *   在 `bot.on("message", ...)` 处理器中，我们通过 `ctx.chatId` 和 `ctx.from.id` 来获取并打印聊天ID和用户ID，这对于调试和记录非常有用。
    *   在启动 bot 前，我们使用 `await bot.api.getMe()` 来异步获取机器人自身的信息（比如用户名）并打印出来。

2.  **核心功能：主动发送消息**:
    这是一个非常实用的功能，意味着您的 bot 可以在没有用户交互的情况下主动推送信息。

    *   **方法**: 我们使用 `bot.api.sendMessage(chatId, text)` 方法来发送消息。
        *   `chatId`: 目标聊天窗口的唯一标识。可以是用户的私聊ID，也可以是群组ID。
        *   `text`: 您想要发送的文本内容。

    *   **代码示例解析**:
        *   `const myAccountId = 6711190671;`: 这里预设了一个私聊用户的ID。**您需要将其替换为您自己的Telegram用户ID**才能向自己发送消息。
        *   `const groupId = -1002757459232;`: 这里预设了一个群组的ID。**您需要将其替换为您目标群组的ID**。
        *   `await bot.api.sendMessage(myAccountId,'我是你的机器人')`: 这行代码演示了如何向指定用户ID发送私聊消息。
        *   `await bot.api.sendMessage(groupId,'我是群聊机器人')`: 这行代码演示了如何向指定群组ID发送群聊消息。

    *   **如何使用**:
        1.  在代码中，找到这两行 `await bot.api.sendMessage(...)`。
        2.  根据您的需求，取消掉您想测试的那一行的注释（即删除前面的 `//`）。
        3.  确保您已经将 `myAccountId` 或 `groupId` 替换为有效的目标ID。
        4.  重新运行 `deno run --allow-net --allow-env demo2.ts`，bot启动后就会立即发送这条消息。

## 如何获取用户/群组 ID

*   **用户 ID**: 您可以与 [@userinfobot](https://t.me/userinfobot) 这样的机器人开始聊天，它会告诉您您的用户 ID。
*   **群组 ID**: 将您的 bot 添加到一个群组中。当群组中有任何消息时，`ctx.chatId` 就会是该群组的 ID。您可以在 `bot.on("message", ...)` 的日志中看到它。群组 ID 通常是一个负数。

## 如何运行

运行方式与 `demo1.ts` 相同：

```shell
deno run --allow-net --allow-env demo2.ts
```

现在，当您向 bot 发送消息时，查看您的终端，您会看到打印出的聊天 ID 和用户 ID。您也可以尝试取消发送消息代码的注释，看看 bot 是如何主动发送消息的。