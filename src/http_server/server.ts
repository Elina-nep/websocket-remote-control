import WebSocket from "ws";
import "dotenv/config";
import { getMousePos } from "robotjs";

const PORT: number = +process.env.PORT! || 8080;
console.log(process.env.PORT!);
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
          const coordinates = getMousePos();
          wsClient.send(coordinates);
          break;

        case "draw_circle":
          const radius = receivedCommand[1];
          wsClient.send(receivedCommand);
          break;

        case "draw_square":
          const length = receivedCommand[1];
          wsClient.send(receivedCommand);
          break;

        case "draw_rectangle":
          const width = receivedCommand[1];
          const height = receivedCommand[2];
          wsClient.send(receivedCommand);
          break;

        case "mouse_up":
          const shiftUp = receivedCommand[1];
          wsClient.send(receivedCommand);
          break;

        case "mouse_down":
          const shiftDown = receivedCommand[1];
          wsClient.send(receivedCommand);
          break;

        case "mouse_left":
          const shiftLeft = receivedCommand[1];
          wsClient.send(receivedCommand);
          break;

        case "mouse_right":
          const shiftRight = receivedCommand[1];
          wsClient.send(receivedCommand);
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
