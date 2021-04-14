import {ForceReply, Row, ReplyKeyboard, InlineKeyboard, KeyboardButton, InlineKeyboardButton} from 'node-telegram-keyboard-wrapper';

const inlineKeyboard = new InlineKeyboard();

inlineKeyboard
	.push(
		new Row(
			new InlineKeyboardButton("视频精选", "callback_data", "video"),
		)
	);

export default inlineKeyboard;