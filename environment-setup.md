# Telegram Bot 开发环境配置指南

本指南将帮助您配置开发 Telegram Bot 所需的本地环境，主要包括 Deno 的安装和 Telegram Bot 的创建。

## 1. 安装 Deno

Deno 是一个现代、安全的 JavaScript 和 TypeScript 运行时。我们将使用 Deno 来运行我们的 bot 代码。

### Windows

在 PowerShell 中执行以下命令：

```powershell
irm https://deno.land/install.ps1 | iex
```

### macOS / Linux

在您的终端中执行以下命令：

```shell
curl -fsSL https://deno.land/install.sh | sh
```

安装完成后，您可以通过运行 `deno --version` 来验证安装是否成功。

## 2. 创建 Telegram Bot

要创建一个新的 Telegram Bot，您需要与 "BotFather" 对话，这是 Telegram 官方用于管理所有 bot 的 bot。

1.  **找到 BotFather**: 在 Telegram 中搜索 "BotFather" 并开始与他对话。
2.  **创建新 Bot**: 发送 `/newbot` 命令。
3.  **命名您的 Bot**: BotFather 会要求您为 bot 选择一个名字。这个名字是用户在聊天中看到的。
4.  **选择用户名**: 接下来，为您的 bot 选择一个唯一的用户名。这个用户名必须以 "bot" 结尾，例如 `my_awesome_bot`。
5.  **获取 Bot Token**: 创建成功后，BotFather 会给您一个 **HTTP API Token**。这个 token 非常重要，是您用来控制 bot 的钥匙。请务必妥善保管，不要泄露给任何人。

    它看起来像这样：`1234567890:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`

## 3. 项目设置

1.  **创建项目文件夹**: 为您的 bot 创建一个新的文件夹。
2.  **创建 `.env` 文件**: 在项目文件夹中，创建一个名为 `.env` 的文件。这个文件将用于存储您的 Bot Token。
3.  **添加 Token 到 `.env`**: 在 `.env` 文件中添加以下内容，将 `YOUR_TELEGRAM_BOT_TOKEN` 替换为您从 BotFather 那里获取的真实 token：

    ```
    BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
    ```

    使用 `.env` 文件可以避免将敏感信息直接写入代码中，是一种很好的安全实践。

现在，您的环境已经准备就绪，可以开始编写和运行您的第一个 Telegram Bot 了！