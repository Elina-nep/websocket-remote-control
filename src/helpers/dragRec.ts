import robot from "robotjs";

export const drawRec = (width: number, height: number = width) => {
  const mousePosition = robot.getMousePos();
  let x0 = mousePosition.x;
  let y0 = mousePosition.y;
  let x: number = 0;
  let y: number = 0;
  robot.mouseToggle("down");
  robot.mouseToggle("down");
  for (let dx = 0; dx <= width; dx += 2) {
    x = x0 + dx;
    robot.dragMouse(x, y0);
  }
  x0 = x;

  for (let dy = 0; dy <= height; dy += 2) {
    y = y0 + dy;
    robot.dragMouse(x, y);
  }
  y0 = y;

  for (let dx = 0; dx <= width; dx += 2) {
    x = x0 - dx;
    robot.dragMouse(x, y0);
  }

  for (let dy = 0; dy <= height; dy += 2) {
    y = y0 - dy;
    robot.dragMouse(x, y);
  }

  robot.mouseToggle("up");
};
