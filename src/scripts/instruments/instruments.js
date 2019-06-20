import Canvas from '../Canvas/Canvas';
import gifshot from '../gifshot';

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
    coords.x = e.clientX - canvBox.left;
    coords.y = e.clientY - canvBox.top;
    return coords;
  }

  showCanvasInfo() {
    let size = this.getCanvasSize();
    const selectSize = document.querySelector('#sizes_canvas');
    const coordsWrapper = document.querySelector('#cursor_coords');
    const canvas = [mainCanvas.getCanvas().canvas][0];
    let coords = null;

    let divider = canvas.width / size;
    const sizeWrapper = document.querySelector('#layer_size');

    selectSize.addEventListener('input', () => {
      size = this.getCanvasSize();
      divider = canvas.width / size;
      sizeWrapper.innerHTML = `${size}x${size}`;
    });

    mainCanvas.getCanvas().canvas.addEventListener('mousemove', e => {
      coords = this.getCursorCoords(e);
      coords.x = Math.floor(coords.x / divider);
      coords.y = Math.floor(coords.y / divider);
      if (coords.x + 1 < 1) coords.x += 1;

      coordsWrapper.innerHTML = `${coords.x + 1} : ${coords.y + 1}`;
    });

    return coords;
  }

  fullScreen(container) {
    if (container.fullscreenElement) {
      container.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  }

  downloadGif() {
    gifshot.createGIF(
      {
        images: [
          { src: '../../../img/2.png', text: '1' },
          { src: '../../img/pelmen.png', text: '2' },
          { src: '../../img/32.jpg', text: '3' }
        ],
        interval: 1
      },
      function aaa(obj) {
        if (!obj.error) {
          const image = [obj.image][0];
          const animatedImage = document.createElement('img');
          animatedImage.src = image;
          document.body.appendChild(animatedImage);
        }
      }
    );
  }
}
