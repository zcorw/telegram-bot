import * as TelegramBot from 'node-telegram-bot-api';

const token = process.env.TG_TOKEN;
export default (token: string) => {
  const bot = process.env.NODE_ENV === 'development' ? pollBot(token) : webhookBot(token);

  return {
    bind(...events: ((bot: TelegramBot) => void)[]) {
      events.map((event) => event(bot));
    },
    sendMessage(id: number, message: string) {
      bot.sendMessage(id, message);
    }
  }
}

const pollBot = (token: string) => {
  return new TelegramBot(token, {polling: true});
}

const webhookBot = (token: string) => {
  const bot = new TelegramBot(token, {webHook: {
    host: '127.0.0.1',
    port: +process.env.TG_PORT,
    autoOpen: true,
  }});
  bot.setWebHook(process.env.TG_HOST);
  return bot;
}