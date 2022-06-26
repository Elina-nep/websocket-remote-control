import WebSocket from "ws";
import "dotenv/config";
import robot, { getMousePos, moveMouse } from "robotjs";
import { mouseMove } from "../helpers/move";
import { drawCircle } from "../helpers/drawCircle";
import { drawRec } from "../helpers/dragRec";
import { prntScreen } from "../helpers/prntScreen";

const PORT: number = +process.env.PORT! || 8080;
export const wsServer = new WebSocket.Server({ port: PORT });

export const onConnect = (wsClient: WebSocket) => {
  console.log("Connected to WS");
  wsClient.send("Connected to WS!!!!!");

  wsClient.on("message", function (message: Buffer) {
    try {
      const receivedCommand = message.toString("utf8").split(" ");
      console.log(receivedCommand);
      switch (receivedCommand[0]) {
        case "mouse_position":
          const mousePosition = robot.getMousePos();
          wsClient.send(
            `mouse_position ${mousePosition.x},${mousePosition.y}\0`
          );
          console.log(
            `mouse_position x = ${mousePosition.x} px, y = ${mousePosition.y} px`
          );
          break;

        case "draw_circle":
          const radius = +receivedCommand[1];
          drawCircle(radius);
          console.log(`drawn circle with radius ${radius} px`);
          break;

        case "draw_square":
          const length = +receivedCommand[1];
          drawRec(length);
          console.log(`drawn square with side ${length} px`);
          break;

        case "draw_rectangle":
          const width = +receivedCommand[1];
          const height = +receivedCommand[2];
          drawRec(width, height);
          console.log(
            `drawn rectangle with width ${width} px and height ${height} px`
          );
          break;

        case "mouse_up":
          const shiftUp = +receivedCommand[1];
          mouseMove("up", shiftUp);
          break;

        case "mouse_down":
          const shiftDown = +receivedCommand[1];
          mouseMove("down", shiftDown);
          break;

        case "mouse_left":
          const shiftLeft = +receivedCommand[1];
          mouseMove("left", shiftLeft);
          break;

        case "mouse_right":
          const shiftRight = +receivedCommand[1];
          mouseMove("right", shiftRight);
          break;

        case "prnt_scrn":
          const screenImg = prntScreen();
          wsClient.send(`prnt_scrn ${screenImg}\0`);
          console.log(`Print screen was made`);
          break;

        default:
          console.log("Unknown command");
          break;
      }
    } catch (error) {
      console.log("Error", error);
    }
  });
  wsClient.on("close", function () {
    console.log("Connection lost");
  });
};
