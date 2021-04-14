import * as TelegramBot from 'node-telegram-bot-api';
declare const _default: (token: any) => {
    bind(...events: ((bot: TelegramBot) => void)[]): void;
    sendMessage(id: number, message: string): void;
};
export default _default;
