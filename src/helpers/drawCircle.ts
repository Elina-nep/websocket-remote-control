import robot from "robotjs";

export const drawCircle = (radius: number) => {
  const mousePosition = robot.getMousePos();
  const twoPI = Math.PI * 2;
  let x0 = mousePosition.x;
  let y0 = mousePosition.y;
  let x: number = 0;
  let y: number = 0;
  robot.mouseToggle("down");
  robot.mouseToggle("down");
  for (let angle = 0; angle <= 100; angle++) {
    x = x0 + radius * (1 - Math.cos((angle * twoPI) / 100));
    y = y0 - radius * Math.sin((angle * twoPI) / 100);

    robot.dragMouse(x, y);
  }
  robot.mouseToggle("up");
};
