import { config } from 'dotenv';
import createBot from './bot';
import * as http from 'http';
import * as express from 'express';
import {common, register} from './event';

config();
const port = +process.env.PORT;
const app = express();
const bot = createBot(process.env.TG_TOKEN);

bot.bind(common, register);

app.get('/send', (req, res) => {
  const { query } = req;
  const { id, msg } = query;
  bot.sendMessage(+id, msg as string);
  res.sendStatus(200);
});

var server = http.createServer(app);
server.listen(port, '127.0.0.1');