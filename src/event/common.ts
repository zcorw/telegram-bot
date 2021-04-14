import TelegramBot from 'node-telegram-bot-api';

export default (bot: TelegramBot) => {
  bot.onText(/\/start/, async (msg, match) => {
    bot.sendMessage(
      msg.chat.id,
      `欢迎使用四库全书，目前接待员学习的技能还不多，敬请期待后续的更新。\n以下是可以使用的命令列表：\n\/adduser - 注册新账号`,
    )
  });
}