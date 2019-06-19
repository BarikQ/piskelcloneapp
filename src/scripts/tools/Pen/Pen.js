import Canvas from '../../Canvas/Canvas';
import Color from '../Color/Color';

const mainCanvas = new Canvas(800, 800, 'mainCanvas', 'mainCanvas');
const colors = new Color('main');

export default class Pen {
  draw() {
    const canvas = [mainCanvas.getCanvas().canvas][0];
    const ctx = [mainCanvas.getCanvas().ctx][0];
    const canvBox = {
      left: canvas.getBoundingClientRect().left,
      top: canvas.getBoundingClientRect().top
    };
    let x0 = null;
    let y0 = null;
    let x1 = null;
    let y1 = null;
    let coordX = null;
    let coordY = null;

    function draw(e) {
      x1 = e.pageX - canvBox.left;
      y1 = e.pageY - canvBox.top;

      const dx = Math.abs(x1 - x0);
      const dy = Math.abs(y1 - y0);
      const sx = x0 < x1 ? 1 : -1;
      const sy = y0 < y1 ? 1 : -1;
      let err = dx - dy;

      while (true) {
        coordX = Math.floor(x0 / 25);
        coordY = Math.floor(y0 / 25);
        ctx.fillRect(coordX * 25, coordY * 25, 25, 25);

        if (x0 === x1 && y0 === y1) break;
        const err2 = 2 * err;
        if (err2 > -dy) {
          err -= dy;
          x0 += sx;
        }
        if (err2 < dx) {
          err += dx;
          y0 += sy;
        }
      }

      return 1;
    }

    function startDrawing(e) {
      ctx.beginPath();
      ctx.fillStyle = colors.primaryColor;
      x0 = e.pageX - canvBox.left;
      y0 = e.pageY - canvBox.top;
      ctx.moveTo(x0, y0);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('click', draw);
    }

    function stopDrawing() {
      canvas.removeEventListener('mousemove', draw);
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
  }
}
