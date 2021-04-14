"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var bot_1 = require("./bot");
var http = require("http");
var express = require("express");
dotenv_1.config();
var port = +process.env.PORT;
var app = express();
var bot = bot_1.default(process.env.TG_TOKEN);
app.get('/send', function (req, res) {
    var query = req.query;
    var id = query.id, msg = query.msg;
    bot.sendMessage(+id, msg);
    res.sendStatus(200);
});
var server = http.createServer(app);
server.listen(port, '127.0.0.1');
//# sourceMappingURL=index.js.map