import TelegramBot from 'node-telegram-bot-api';
import siteKeyboard from '../keyboard/chooseSite';
import { ForceReply } from 'node-telegram-keyboard-wrapper';
import { UserServiceType } from '../globel';
import { addVideoUser, addBookUser } from '../services';
import { registerVideo, registerBook } from '../services/register';

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
        replyMail(query.from.id, query.data);
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

  const replyMail = async (chatId: number, type: string) => {
    const reply = await bot.sendMessage(chatId, "请输入一个邮箱作为账号", {
      reply_markup: ForceReply.getMarkup(),
    });
    const listenerId = bot.onReplyToMessage(reply.chat.id, reply.message_id, async (msg) => {
      try {
        const password = await register(type)(msg);
        bot.sendMessage(msg.from.id, `账号已注册，密码为 ${password}`);
      } catch (e) {
        await bot.sendMessage(msg.from.id, e.message);
        replyMail(chatId, type);
      }
      bot.removeReplyListener(listenerId);
    })
  }
}

const checkMail = (text?: string) => {
  const match = text?.match(/[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/);
  const hasMail = !!match;
  if (!hasMail) {
    throw new Error('账号格式错误，请以邮箱作为账号');
  }
  return match[0];
}

const register = (type: string): (msg: TelegramBot.Message) => Promise<string> => {
  let callback: (msg: TelegramBot.Message) => Promise<string>;
  switch (type) {
    case 'video':
      callback = videoSite;
      break;
    case 'book':
      callback = bookSite;
      break;
    default:
      callback = videoSite;
  }
  return callback;
}

const userInfo = (msg: TelegramBot.Message, mail: string): UserServiceType => {
  return {
    firstName: msg.from.first_name,
    lastName: msg.from.last_name,
    username: msg.from.username,
    tgId: msg.from.id,
    chatId: msg.message_id,
    mail,
  };
}


const videoSite = async (msg: TelegramBot.Message): Promise<string> => {
  try {
    const mail = checkMail(msg.text)
    const user: UserServiceType = userInfo(msg, mail);
    const res = await registerVideo(process.env.EMBY_ADMIN, process.env.EMBY_PASSWORD, mail);
    await addVideoUser(user);

    return res.data.password;
  } catch (e) {
    throw e;
  }
}

const bookSite = async (msg: TelegramBot.Message): Promise<string> => {
  try {
    const mail = checkMail(msg.text)
    const user: UserServiceType = userInfo(msg, mail);
    const res = await registerBook(mail);
    await addBookUser(user);

    return res.data.password;
  } catch (e) {
    throw e;
  }
}