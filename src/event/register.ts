import TelegramBot from 'node-telegram-bot-api';
import siteKeyboard from '../keyboard/chooseSite';
import { ForceReply } from 'node-telegram-keyboard-wrapper';
import { UserServiceType } from '../globel';
import { addUser } from '../services';
import { register } from '../services/register';

export default (bot: TelegramBot) => {
  bot.onText(/\/adduser/i, async (msg, match) => {
    try {
      if (msg.chat.type === 'group') {
        throw new Error('为保护你的账号，请私信机器人');
      }
      const keyboard = siteKeyboard.getMarkup();
      const options: TelegramBot.SendMessageOptions = {
        reply_markup: keyboard,
      };

      bot.on("callback_query", async (query) => {
        // await bot.answerCallbackQuery(query.id, { text: "Action received!" })
        replyMail(query.from.id);
      });

      bot.sendMessage(
        msg.chat.id,
        '请选择要注册的网站',
        options,
      );
    } catch (e) {
      bot.sendMessage(msg.chat.id, e.message);
    }

  })

  const replyMail = async (chatId: number) => {
    const reply = await bot.sendMessage(chatId, "请输入一个邮箱作为账号", {
      reply_markup: ForceReply.getMarkup(),
    });
    const listenerId = bot.onReplyToMessage(reply.chat.id, reply.message_id, async (msg) => {
      try {
        const password = await videoSite(msg);
        bot.sendMessage(msg.from.id, `账号已注册，密码为 *${password}*`);
      } catch (e) {
        console.log("replyMail -> e", e)
        await bot.sendMessage(msg.from.id, e.message);
        replyMail(chatId);
      }
      bot.removeReplyListener(listenerId);
    })
  }
}



const videoSite = async (msg: TelegramBot.Message) => {
  const match = msg.text?.match(/[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/);
  const hasMail = !!match;
  try {
    if (!hasMail) {
      throw new Error('账号格式错误，请以邮箱作为账号');
    }
    const user: UserServiceType = {
      firstName: msg.from.first_name,
      lastName: msg.from.last_name,
      username: msg.from.username,
      tgId: msg.from.id,
      chatId: msg.message_id,
      mail: match[0],
    };
    const res = await register(process.env.EMBY_ADMIN, process.env.EMBY_PASSWORD, match[0]);
    await addUser(user);

    return res.data.password;
  } catch (e) {
    throw e;
  }
}