"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var TelegramBot = require("node-telegram-bot-api");
var node_telegram_keyboard_wrapper_1 = require("node-telegram-keyboard-wrapper");
var token = process.env.TG_TOKEN;
exports.default = (function (token) {
    var bot = new TelegramBot(token, { polling: true });
    var BotState = {
        isReplyKeyboardOpen: false
    };
    var replyKeyboard = new node_telegram_keyboard_wrapper_1.ReplyKeyboard();
    var inlineKeyboard = new node_telegram_keyboard_wrapper_1.InlineKeyboard();
    var firstReplyKeyboardRowToShowConstructor = new node_telegram_keyboard_wrapper_1.Row(new node_telegram_keyboard_wrapper_1.KeyboardButton("1:1 Button"), new node_telegram_keyboard_wrapper_1.KeyboardButton("1:2 Button"));
    var secondReplyKeyboardRowToShowRowAsArray = new node_telegram_keyboard_wrapper_1.Row();
    secondReplyKeyboardRowToShowRowAsArray.push(new node_telegram_keyboard_wrapper_1.KeyboardButton("2:1 Button"), new node_telegram_keyboard_wrapper_1.KeyboardButton("2:2 Button"));
    replyKeyboard
        .push(firstReplyKeyboardRowToShowConstructor, secondReplyKeyboardRowToShowRowAsArray);
    inlineKeyboard
        .push(new node_telegram_keyboard_wrapper_1.Row(new node_telegram_keyboard_wrapper_1.InlineKeyboardButton("1:1 Button", "callback_data", "Works 1!"), new node_telegram_keyboard_wrapper_1.InlineKeyboardButton("1:2 Button", "callback_data", "Works 2!")), new node_telegram_keyboard_wrapper_1.Row(new node_telegram_keyboard_wrapper_1.InlineKeyboardButton("2:1 Button", "callback_data", "Works 3!"), new node_telegram_keyboard_wrapper_1.InlineKeyboardButton("2:2 Button", "callback_data", "Works 4!")));
    function hasBotCommands(entities) {
        if (!entities || !(entities instanceof Array)) {
            return false;
        }
        return entities.some(function (e) { return e.type === "bot_command"; });
    }
    bot.onText(/\/replyKeyboard/i, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
        var messageOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    messageOptions = {
                        reply_markup: replyKeyboard.getMarkup(),
                    };
                    return [4, bot.sendMessage(msg.from.id, "This is a message with a reply keyboard. Click on one of the buttons to close it.", messageOptions)];
                case 1:
                    _a.sent();
                    BotState.isReplyKeyboardOpen = true;
                    return [2];
            }
        });
    }); });
    bot.onText(/\/forceReply/i, function (msg) {
        var options = {
            reply_markup: node_telegram_keyboard_wrapper_1.ForceReply.getMarkup(),
        };
        bot.sendMessage(msg.from.id, "Hey, this is a forced-reply. Reply me. C'mon. I dare you.", options);
    });
    bot.onText(/\/inlineKeyboard/i, function (msg) {
        var options = {
            reply_markup: inlineKeyboard.getMarkup()
        };
        bot.sendMessage(msg.from.id, "This is a message with an inline keyboard.", options);
    });
    bot.on("message", function (msg) { return __awaiter(void 0, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!hasBotCommands(msg.entities)) return [3, 4];
                    if (!BotState.isReplyKeyboardOpen) return [3, 2];
                    options = {
                        reply_markup: replyKeyboard.remove()
                    };
                    return [4, bot.sendMessage(msg.from.id, "Message Received. I'm closing the replyKeyboard.", options)];
                case 1:
                    _a.sent();
                    BotState.isReplyKeyboardOpen = false;
                    return [3, 4];
                case 2:
                    if (!!!msg.reply_to_message) return [3, 4];
                    return [4, bot.sendMessage(msg.from.id, "HOW DARE YOU! But force reply worked.")];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2];
            }
        });
    }); });
    bot.on("callback_query", function (query) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, bot.answerCallbackQuery(query.id, { text: "Action received!" })];
                case 1:
                    _a.sent();
                    return [4, bot.sendMessage(query.from.id, "Hey there! You clicked on an inline button! ;) So, as you saw, the support library works!")];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    return {
        bind: function () {
            var events = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                events[_i] = arguments[_i];
            }
            events.map(function (event) { return event(bot); });
        },
        sendMessage: function (id, message) {
            bot.sendMessage(id, message);
        }
    };
});
//# sourceMappingURL=bot.js.map