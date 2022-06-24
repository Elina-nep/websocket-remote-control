import robot from "robotjs";
import Jimp from "jimp";

export const prntScreen = () => {
  const { x: x0, y: y0 } = robot.getMousePos();
  const imgArray = [];
  const PRNT_SIZE = 200;
  const shiftX = x0 - PRNT_SIZE / 4;
  const shiftY = y0 - PRNT_SIZE / 4;
  let xStart;
  let yStart;

  if (shiftX > PRNT_SIZE / 4) {
    xStart = shiftX;
  } else if (shiftX <= PRNT_SIZE / 4) {
    xStart = 0;
  }
  if (yStart > PRNT_SIZE / 4) {
    yStart = shiftY;
  } else if (shiftY <= PRNT_SIZE / 4) {
    yStart = 0;
  }

  const screen = robot.screen.capture(shiftX, shiftY, PRNT_SIZE, PRNT_SIZE);

  let screenImg = new Jimp(PRNT_SIZE, PRNT_SIZE);
  for (let x = 0; x < PRNT_SIZE; x++) {
    for (let y = 0; y < PRNT_SIZE; y++) {
      const hex = screen.colorAt(x, y);
      const num = parseInt(hex + "ff", 16);
      screenImg.setPixelColor(num, x, y);
    }
  }

  let string64: string;
  screenImg.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
    const str = buffer.toString("base64");
    string64 = str;
  });

  return string64;
};
