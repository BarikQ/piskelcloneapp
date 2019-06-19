import Canvas from '../Canvas/Canvas';
import Tools from '../tools/Tools';

const tools = new Tools();
const mainCanvas = new Canvas(800, 800, 'mainCanvas', 'mainCanvas');

export default class Frames {
  render() {
    const framesContainer = document.querySelectorAll('.frame');
    let activeFrame = null;
    let number = 0;
    framesContainer.forEach((elem, index) => {
      if (elem.classList.contains('active')) {
        activeFrame = elem;
        number = index;
      }
    });

    const currentImg = mainCanvas.convertToImg('104px');
    currentImg.id = `frame_img_${number}`;
    activeFrame.replaceChild(currentImg, activeFrame.querySelector('.imgFrame'));
  }

  addFrame() {
    const framesList = document.querySelectorAll('.frame');
    let newFrame = null;

    framesList.forEach(elem => {
      if (elem.classList.contains('active')) elem.classList.remove('active');
    });

    newFrame = document.createElement('li');
    newFrame.classList = 'list-group-item frame active';
    newFrame.id = `frame_${framesList.length}`;

    framesList[framesList.length - 1].insertAdjacentElement('afterend', newFrame);

    newFrame.addEventListener('click', () => tools.active(newFrame, `.frame`));
    newFrame.addEventListener('click', () => mainCanvas.refresh());

    mainCanvas.clearCanvas();

    newFrame.appendChild(mainCanvas.convertToImg('104px'));
  }
}
