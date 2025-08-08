# Telegram Bot 基础教程 (Demo 1)

本教程将引导您完成一个基本的 Telegram bot 的创建过程，该 bot 能够响应 `/start` 命令和接收普通消息。

## 准备工作

在开始之前，请确保您已经完成了[环境配置文档](https://github.com/your-repo/link-to-env-setup.md)中的所有步骤，包括：

1.  安装 Deno
2.  创建 Telegram Bot 并获取 Token

## 代码解析

这是我们的第一个 bot 示例代码 (`demo1.ts`)：

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
bot.on("message", (ctx) => ctx.reply("Got another message!"));

// 现在，你已经确定了将如何处理信息，可以开始运行你的 bot。
// 这将连接到 Telegram 服务器并等待消息。

// 启动你的 bot
bot.start();
```

### 关键代码说明

1.  **导入模块**:
    *   `import { Bot } from "..."`: 从 grammY 库导入核心的 `Bot` 类。grammY 是一个流行的 Telegram Bot 框架。
    *   `import "jsr:@std/dotenv/load"`: 这个模块用于从 `.env` 文件加载环境变量。这是一种安全管理敏感信息（如 Bot Token）的最佳实践。

2.  **初始化 Bot**:
    *   `const bot = new Bot(Deno.env.get("BOT_TOKEN")!);`: 创建一个新的 `Bot` 实例。我们从环境变量中读取 `BOT_TOKEN`。请确保您的 `.env` 文件中有 `BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN` 这样的配置。

3.  **命令处理**:
    *   `bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));`: 这行代码为 `/start` 命令注册了一个处理器。当用户发送 `/start` 时，bot 会回复 "Welcome! Up and running."。`ctx` 是上下文对象，包含了关于收到的消息的所有信息。

4.  **消息处理**:
    *   `bot.on("message", (ctx) => ctx.reply("Got another message!"));`: 这为所有其他类型的消息注册了一个处理器。当用户发送任何非命令消息时，bot 会回复 "Got another message!"。

5.  **启动 Bot**:
    *   `bot.start();`: 这行代码会启动 bot，使其连接到 Telegram 的服务器并开始监听消息。

## 如何运行

1.  **创建 `.env` 文件**: 在项目根目录创建一个名为 `.env` 的文件，并添加以下内容，将 `YOUR_TELEGRAM_BOT_TOKEN` 替换为您自己的 Bot Token:
    ```
    BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
    ```

2.  **运行代码**: 在终端中执行以下命令：
    ```shell
    deno run --allow-net --allow-env demo1.ts
    ```
    *   `--allow-net`: 授予网络访问权限，以便连接到 Telegram。
    *   `--allow-env`: 授予读取环境变量的权限。

现在，您的 bot 应该已经成功运行了！去和它打个招呼吧！