import Frames from '../frames/Frames';
import Canvas from '../Canvas/Canvas';
import Color from './Color/Color';
import Instruments from '../instruments/instruments';

const mainCanvas = new Canvas(800, 800, 'mainCanvas', 'mainCanvas');
const colors = new Color('main');
const instruments = new Instruments();
const frames = new Frames();

export default class Tools {
  PenTool(eraser) {
    this.changeTool();

    const canvas = [mainCanvas.getCanvas().canvas][0];
    const ctx = [mainCanvas.getCanvas().ctx][0];

    let x0 = null;
    let y0 = null;
    let x1 = null;
    let y1 = null;
    let coordX = null;
    let coordY = null;

    function draw(e) {
      const pixelsNumber = instruments.getCanvasSize();
      const penSize = instruments.getPenSize();
      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;

      const divider = canvas.width / pixelsNumber;
      const dx = Math.abs(x1 - x0);
      const dy = Math.abs(y1 - y0);
      const sx = x0 < x1 ? 1 : -1;
      const sy = y0 < y1 ? 1 : -1;
      let err = dx - dy;

      while (true) {
        coordX = Math.floor(x0 / divider);
        coordY = Math.floor(y0 / divider);
        ctx.fillRect(coordX * divider, coordY * divider, divider * penSize, divider * penSize);

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
      if (eraser) ctx.fillStyle = colors.backgroundColor;
      else ctx.fillStyle = colors.primaryColor;
      x0 = instruments.getCursorCoords(e).x;
      y0 = instruments.getCursorCoords(e).y;
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

  StrokeTool() {
    this.changeTool();

    const canvas = [mainCanvas.getCanvas().canvas][0];
    const ctx = [mainCanvas.getCanvas().ctx][0];

    let pixelsNumber = instruments.getCanvasSize();
    let divider = canvas.width / pixelsNumber;
    let x0 = null;
    let y0 = null;
    let x1 = null;
    let y1 = null;
    let cX0 = null;
    let cY0 = null;
    let cX1 = null;
    let cY1 = null;
    let isDrawing = false;

    function draw(e) {
      pixelsNumber = instruments.getCanvasSize();
      divider = canvas.width / pixelsNumber;

      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;

      cX1 = Math.floor(x1 / divider);
      cY1 = Math.floor(y1 / divider);
      cX0 = Math.floor(x0 / divider);
      cY0 = Math.floor(y0 / divider);

      // console.log(cX1, cY1);
      // const dx = Math.abs(cX1 - cX0);
      // const dy = Math.abs(cY1 - cY0);
      // const sx = cX0 < cX1 ? 1 : -1;
      // const sy = cY0 < cY1 ? 1 : -1;
      // let err = dx - dy;

      // while (true) {
      //   const clearX0 = cX0;
      //   const clearY0 = cY0;
      //   if (cX0 === cX1 && cY0 === cY1) {
      //     break;
      //   }
      //   const err2 = 2 * err;
      //   if (err2 >= -dy) {
      //     err -= dy;
      //     cX0 += sx;
      //   }
      //   if (err2 <= dx) {
      //     err += dx;
      //     cY0 += sy;
      //   }

      //   ctx.clearRect(clearX0 * divider, clearY0 * divider, divider, divider);
      //   ctx.fillRect(cX0 * divider, cY0 * divider, divider, divider);
      // }
    }

    function startDrawing(e) {
      isDrawing = true;
      ctx.beginPath();
      ctx.fillStyle = colors.primaryColor;
      x0 = instruments.getCursorCoords(e).x;
      y0 = instruments.getCursorCoords(e).y;

      x0 = Math.floor(x0);
      y0 = Math.floor(y0);

      ctx.moveTo(x0, y0);
      canvas.addEventListener('mousemove', draw);
    }

    function stopDrawing(e) {
      canvas.removeEventListener('mousemove', draw);
      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;

      cX1 = Math.floor(x1 / divider);
      cY1 = Math.floor(y1 / divider);
      instruments.simpleBresenhams(cX0, cY0, cX1, cY1, divider, ctx);
      isDrawing = false;
    }

    function stopDrawingOut(e) {
      canvas.removeEventListener('mousemove', draw);
      if (e.type === 'mouseout' && !isDrawing) return;
      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;

      cX1 = Math.floor(x1 / divider);
      cY1 = Math.floor(y1 / divider);
      instruments.simpleBresenhams(cX0, cY0, cX1, cY1, divider, ctx);
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseout', stopDrawingOut);
    canvas.addEventListener('mouseup', stopDrawing);
  }

  veerTool() {
    // StrokeTool() {
    //   this.changeTool();
    //   const canvas = [mainCanvas.getCanvas().canvas][0];
    //   const ctx = [mainCanvas.getCanvas().ctx][0];
    //   let x0 = null;
    //   let y0 = null;
    //   let x1 = null;
    //   let y1 = null;
    //   let cX0 = null;
    //   let cY0 = null;
    //   let cX1 = null;
    //   let cY1 = null;
    //   function draw(e) {
    //     const pixelsNumber = instruments.getCanvasSize();
    //     const divider = canvas.width / pixelsNumber;
    //     x1 = instruments.getCursorCoords(e).x;
    //     y1 = instruments.getCursorCoords(e).y;
    //     cX1 = Math.floor(x1 / divider);
    //     cY1 = Math.floor(y1 / divider);
    //     cX0 = Math.floor(x0 / divider);
    //     cY0 = Math.floor(y0 / divider);
    //     console.log(cX1, cY1);
    //     const dx = Math.abs(cX1 - cX0);
    //     const dy = Math.abs(cY1 - cY0);
    //     const sx = cX0 < cX1 ? 1 : -1;
    //     const sy = cY0 < cY1 ? 1 : -1;
    //     let err = dx - dy;
    //     while (true) {
    //       // ctx.clearRect(cX0 * divider, cY0 * divider, divider, divider);
    //       ctx.fillRect(cX0 * divider, cY0 * divider, divider, divider);
    //       if (cX0 === cX1 && cY0 === cY1) break;
    //       const err2 = 2 * err;
    //       if (err2 >= -dy) {
    //         err -= dy;
    //         cX0 += sx;
    //       }
    //       if (err2 <= dx) {
    //         err += dx;
    //         cY0 += sy;
    //       }
    //     }
    //   }
    //   function startDrawing(e) {
    //     ctx.beginPath();
    //     ctx.fillStyle = colors.primaryColor;
    //     x0 = instruments.getCursorCoords(e).x;
    //     y0 = instruments.getCursorCoords(e).y;
    //     x0 = Math.floor(x0);
    //     y0 = Math.floor(y0);
    //     ctx.moveTo(x0, y0);
    //     canvas.addEventListener('mousemove', draw);
    //   }
    //   function stopDrawing() {
    //     canvas.removeEventListener('mousemove', draw);
    //   }
    //   canvas.addEventListener('mousedown', startDrawing);
    //   canvas.addEventListener('mouseout', stopDrawing);
    //   canvas.addEventListener('mouseup', stopDrawing);
    // }
  }

  eraserTool() {
    this.changeTool();

    this.PenTool(true);
  }

  addEventListeners() {
    const toolsList = document.querySelectorAll('.tool');

    toolsList[0].addEventListener('click', () => this.PenTool());
    toolsList[2].addEventListener('click', () => this.eraserTool());
    toolsList[3].addEventListener('click', () => this.StrokeTool());
  }

  changeTool() {
    const image = mainCanvas.convertToImg(800);
    const canvas = mainCanvas.getCanvas().canvas.cloneNode();
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0, 800, 800);

    mainCanvas.getCanvas().canvas.parentNode.replaceChild(canvas, mainCanvas.getCanvas().canvas);

    canvas.addEventListener('mouseup', () => {
      frames.render();
    });
    canvas.addEventListener('mouseout', frames.render);
    instruments.showCanvasInfo();
  }
}
