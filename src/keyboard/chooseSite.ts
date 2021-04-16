import { ForceReply, Row, ReplyKeyboard, InlineKeyboard, KeyboardButton, InlineKeyboardButton } from 'node-telegram-keyboard-wrapper';

const inlineKeyboard = new InlineKeyboard();

inlineKeyboard
	.push(
		new Row(
			new InlineKeyboardButton("视频精选", "callback_data", "video"),
			new InlineKeyboardButton("书籍精选", "callback_data", "book"),
		)
	);

export default inlineKeyboard;