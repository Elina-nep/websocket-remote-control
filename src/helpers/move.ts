import robot from "robotjs";

export const mouseMove = (direction: string, shift: number) => {
  const mousePosition = robot.getMousePos();

  switch (direction) {
    case "up":
      robot.moveMouse(mousePosition.x, mousePosition.y - shift);
      break;
    case "down":
      robot.moveMouse(mousePosition.x, mousePosition.y + shift);
      break;
    case "left":
      robot.moveMouse(mousePosition.x - shift, mousePosition.y);
      break;
    case "right":
      robot.moveMouse(mousePosition.x + shift, mousePosition.y);
      break;
    default:
      break;
  }
  console.log("Mouse moved at x:" + mousePosition.x + " y:" + mousePosition.y);
};
