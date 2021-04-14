import TelegramBot from 'node-telegram-bot-api';
import siteKeyboard from '../keyboard/chooseSite';
import {ForceReply} from 'node-telegram-keyboard-wrapper';

export default (bot: TelegramBot) => {
  bot.onText(/\/adduser/, async (msg, match) => {
    const keyboard = siteKeyboard.getMarkup();
    const options: TelegramBot.SendMessageOptions = {
      reply_markup: keyboard,
    };

    bot.on("callback_query", async (query) => {
      console.log("query", query)
      await bot.answerCallbackQuery(query.id, { text: "Action received!" })
      const reply = await bot.sendMessage(query.from.id, "请输入一个邮箱作为账号", {
        reply_markup: ForceReply.getMarkup(),
      });
      bot.onReplyToMessage(reply.chat.id, reply.message_id, (msg) => {
        bot.sendMessage(msg.from.id, '注册成功');
      }) 
    });

    bot.sendMessage(
      msg.chat.id,
      '请选择要注册的网站',
      options,
    );
  })
}

