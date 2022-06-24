import WebSocket from "ws";
import "dotenv/config";
import robot, { getMousePos, moveMouse } from "robotjs";
import { mouseMove } from "../helpers/move";
import { drawCircle } from "../helpers/drawCircle";
import { drawRec } from "../helpers/dragRec";

const PORT: number = +process.env.PORT! || 8080;
console.log(process.env.PORT!);
export const wsServer = new WebSocket.Server({ port: PORT });

export const onConnect = (wsClient: WebSocket) => {
  console.log("Connected to WS");
  wsClient.send("Connected to WS!!!!!");

  wsClient.on("message", function (message: Buffer) {
    try {
      const receivedCommand = message.toString("utf8").split(" ");
      switch (receivedCommand[0]) {
        case "mouse_position":
          const mousePosition = robot.getMousePos();
          wsClient.send(
            `mouse_position ${mousePosition.x},${mousePosition.y}\0`
          );
          break;

        case "draw_circle":
          const radius = +receivedCommand[1];
          drawCircle(radius);

          break;

        case "draw_square":
          const length = +receivedCommand[1];
          drawRec(length);
          break;

        case "draw_rectangle":
          const width = +receivedCommand[1];
          const height = +receivedCommand[2];
          drawRec(width, height);
          break;

        case "mouse_up":
          const shiftUp = +receivedCommand[1];
          mouseMove("up", shiftUp);
          //   wsClient.send(receivedCommand);
          break;

        case "mouse_down":
          const shiftDown = +receivedCommand[1];
          mouseMove("down", shiftDown);
          //   wsClient.send(receivedCommand);
          break;

        case "mouse_left":
          const shiftLeft = +receivedCommand[1];
          mouseMove("left", shiftLeft);
          //   wsClient.send(receivedCommand);
          break;

        case "mouse_right":
          const shiftRight = +receivedCommand[1];
          mouseMove("right", shiftRight);
          //   wsClient.send(receivedCommand);
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
