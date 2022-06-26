import Jimp from "jimp";
import { httpServer } from "./src/http_server/index";
import robot from "robotjs";
import { WebSocketServer } from "ws";
import { wsServer, onConnect } from "./src/http_server/server";
import "dotenv/config";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

wsServer.on("connection", onConnect);
console.log(`Start WS server on ${process.env.PORT!} port!`);
