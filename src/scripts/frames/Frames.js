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

    newFrame = framesList[0].cloneNode(true);

    newFrame.classList = 'list-group-item frame active';
    newFrame.id = `frame_${framesList.length}`;

    framesList[framesList.length - 1].insertAdjacentElement('afterend', newFrame);

    newFrame.addEventListener('click', () => tools.active(newFrame, `.frame`));
    newFrame.addEventListener('click', () => mainCanvas.refresh());

    mainCanvas.clearCanvas();

    const copyButton = newFrame.querySelector('#copyButton');
    const deleteButton = newFrame.querySelector('#deleteButton');

    copyButton.addEventListener('click', event => this.copyFrame(event), true);
    deleteButton.addEventListener('click', event => this.deleteFrame(event), true);

    newFrame.replaceChild(mainCanvas.convertToImg('104px'), newFrame.querySelector('.imgFrame'));
  }

  copyFrame(event) {
    event.stopPropagation();

    const choosenFrame = event.target.parentNode;
    const choosenFrameCopy = choosenFrame.cloneNode(true);

    let framesList = document.querySelectorAll('.frame');

    framesList[framesList.length - 1].insertAdjacentElement('afterend', choosenFrameCopy);

    tools.active(choosenFrameCopy, `.frame`);

    choosenFrameCopy.classList = 'list-group-item frame active';
    choosenFrameCopy.addEventListener('click', () => tools.active(choosenFrameCopy, `.frame`));
    choosenFrameCopy.addEventListener('click', () => mainCanvas.refresh());

    framesList = document.querySelectorAll('.frame');
    const framesImages = document.querySelectorAll('.imgFrame');

    framesList.forEach((elem, index) => {
      elem.id = `frame_${index}`;
      framesImages[index].id = `frame_img_${index}`;
    });

    const copyButton = choosenFrameCopy.querySelector('#copyButton');
    const deleteButton = choosenFrameCopy.querySelector('#deleteButton');
    console.log(this);

    copyButton.addEventListener('click', ev => this.copyFrame(ev), true);
    deleteButton.addEventListener('click', ev => this.deleteFrame(ev), true);
  }

  deleteFrame(event) {
    event.stopPropagation();
    let framesList = document.querySelectorAll('.frame');

    if (framesList.length === 1) return 0;

    const choosenFrame = event.target.parentNode;
    choosenFrame.remove();

    const framesImages = document.querySelectorAll('.imgFrame');
    framesList = document.querySelectorAll('.frame');

    framesList.forEach((elem, index) => {
      elem.id = `frame_${index}`;
      framesImages[index].id = `frame_img_${index}`;
    });
    framesList[framesList.length - 1].classList = 'list-group-item frame active';
    mainCanvas.refresh();
    return 1;
  }
}
