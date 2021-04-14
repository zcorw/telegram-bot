import * as TelegramBot from 'node-telegram-bot-api';

const token = process.env.TG_TOKEN;
export default (token) => {
  const bot = new TelegramBot(token, {polling: true});

  return {
    bind(...events: ((bot: TelegramBot) => void)[]) {
      events.map((event) => event(bot));
    },
    sendMessage(id: number, message: string) {
      bot.sendMessage(id, message);
    }
  }
}

