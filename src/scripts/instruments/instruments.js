import Canvas from '../Canvas/Canvas';

const mainCanvas = new Canvas(800, 800, 'mainCanvas', 'mainCanvas');

export default class Intruments {
  getCanvasSize() {
    const select = document.querySelector('#sizes_canvas');
    const option = select.options[select.selectedIndex].value;

    return option;
  }

  getPenSize() {
    const select = document.querySelector('#sizes_pen');
    const option = select.options[select.selectedIndex].value;

    return option;
  }

  getCursorCoords(e) {
    const canvas = [mainCanvas.getCanvas().canvas][0];
    const canvBox = {
      left: canvas.getBoundingClientRect().left,
      top: canvas.getBoundingClientRect().top
    };
    const coords = {};
    coords.x = e.pageX - canvBox.left;
    coords.y = e.pageY - canvBox.top;
    return coords;
  }

  showCanvasInfo() {
    let size = this.getCanvasSize();
    const selectSize = document.querySelector('#sizes_canvas');
    const coordsWrapper = document.querySelector('#cursor_coords');
    const canvas = [mainCanvas.getCanvas().canvas][0];

    let divider = canvas.width / size;
    const sizeWrapper = document.querySelector('#layer_size');

    selectSize.addEventListener('input', () => {
      size = this.getCanvasSize();
      divider = canvas.width / size;
      sizeWrapper.innerHTML = `${size}x${size}`;
    });

    mainCanvas.getCanvas().canvas.addEventListener('mousemove', e => {
      const coords = this.getCursorCoords(e);
      coords.x = Math.floor(coords.x / divider);
      coords.y = Math.floor(coords.y / divider);
      if (coords.x + 1 > size) {
        coords.x -= coords.x + 1 - size;
      } else if (coords.x + 1 < 1) coords.x += 1;
      if (coords.y + 1 > size) coords.y -= coords.y + 1 - size;
      else if (coords.y + 1 < 1) coords.y += 1;
      coordsWrapper.innerHTML = `${coords.x + 1} : ${coords.y + 1}`;
    });

    // const rng = document.querySelector('#frame_rate');

    // rng.addEventListener('input', () => {
    //   const rngValue = document.querySelector('#fps_value');
    //   rngValue.innerHTML = rng.value;
    // });

    // return rng.value;
  }
}
