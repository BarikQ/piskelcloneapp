import Canvas from '../Canvas/Canvas';
import Instruments from '../instruments/instruments';

const mainCanvas = new Canvas(800, 800, 'mainCanvas', 'mainCanvas');
const instruments = new Instruments();
let dragSrcEl;

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
    currentImg.draggable = 'true';
    activeFrame.replaceChild(currentImg, activeFrame.querySelector('.imgFrame'));
    activeFrame.style.backgroundImage = `url("${currentImg.src}")`;
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

    newFrame.addEventListener('click', () => instruments.active(newFrame, `.frame`));
    newFrame.addEventListener('click', () => mainCanvas.refresh());

    this.dragAndDrop(newFrame);
    newFrame.addEventListener('dragstart', () => this.dragAndDrop(newFrame));

    mainCanvas.clearCanvas();

    const copyButton = newFrame.querySelector('#copyButton');
    const deleteButton = newFrame.querySelector('#deleteButton');

    copyButton.addEventListener('click', event => this.copyFrame(event), true);
    deleteButton.addEventListener('click', event => this.deleteFrame(event), true);
    newFrame.style.backgroundImage = null;

    newFrame.replaceChild(mainCanvas.convertToImg('104px'), newFrame.querySelector('.imgFrame'));
  }

  copyFrame(event) {
    event.stopPropagation();

    const choosenFrame = event.target.parentNode;
    const choosenFrameCopy = choosenFrame.cloneNode(true);

    const framesList = document.querySelectorAll('.frame');

    framesList[framesList.length - 1].insertAdjacentElement('afterend', choosenFrameCopy);

    instruments.active(choosenFrameCopy, `.frame`);
    mainCanvas.refresh();

    choosenFrameCopy.classList = 'list-group-item frame active';
    choosenFrameCopy.addEventListener('click', () =>
      instruments.active(choosenFrameCopy, `.frame`)
    );
    choosenFrameCopy.addEventListener('click', () => mainCanvas.refresh());

    const choosenImageCopy = choosenFrameCopy.querySelector('.imgFrame');
    choosenFrameCopy.style.backgroundImage = `url("${choosenImageCopy.src}")`;

    instruments.renumberFrames();

    const copyButton = choosenFrameCopy.querySelector('#copyButton');
    const deleteButton = choosenFrameCopy.querySelector('#deleteButton');

    copyButton.addEventListener('click', ev => this.copyFrame(ev), true);
    deleteButton.addEventListener('click', ev => this.deleteFrame(ev), true);

    this.dragAndDrop(choosenFrameCopy);

    choosenFrameCopy.addEventListener('dragstart', () => this.dragAndDrop(choosenFrameCopy));
  }

  deleteFrame(event) {
    event.stopPropagation();
    let framesList = document.querySelectorAll('.frame');

    if (framesList.length === 1) return 0;

    const choosenFrame = event.target.parentNode;
    choosenFrame.remove();

    framesList = document.querySelectorAll('.frame');

    instruments.renumberFrames();

    framesList[framesList.length - 1].classList = 'list-group-item frame active';
    mainCanvas.refresh();
    return 1;
  }

  dragAndDrop(dragTarget) {
    function dragStart(e) {
      this.classList = 'list-group-item frame active';
      instruments.active(this, `.frame`);
      dragSrcEl = this;

      e.dataTransfer.effectAllowed = 'move';
    }

    function dragDrop(e) {
      if (e.stopPropagation) e.stopPropagation();

      if (dragSrcEl !== this) {
        const dragCopy = dragSrcEl.cloneNode(true);
        const dropCopy = this.cloneNode(true);

        this.parentNode.replaceChild(dragCopy, this);
        dragSrcEl.parentNode.replaceChild(dropCopy, dragSrcEl);

        dragCopy.addEventListener('click', () => instruments.active(dragCopy, '.frame'));
        dragCopy.addEventListener('click', () => mainCanvas.refresh());
        dragCopy.classList.add('swapped');
        dropCopy.classList.add('swapped');
        dropCopy.addEventListener('click', () => instruments.active(dropCopy, '.frame'));
        dropCopy.addEventListener('click', () => mainCanvas.refresh());
      }

      instruments.renumberFrames();

      return false;
    }

    dragTarget.addEventListener('dragstart', dragStart, false);
    dragTarget.addEventListener('dragenter', event => this.dragEnter(event));
    dragTarget.addEventListener('dragover', event => this.dragOver(event));
    dragTarget.addEventListener('dragleave', event => this.dragLeave(event));
    dragTarget.addEventListener('drop', dragDrop, false);
    dragTarget.addEventListener('dragend', event => this.dragEnd(event));
  }

  dragEnter(event) {
    event.stopPropagation();

    event.target.classList.add('over');
  }

  dragOver(event) {
    event.stopPropagation();
    if (event.preventDefault) {
      event.preventDefault();
    }

    event.dataTransfer.dropEffect = 'move';
  }

  dragLeave(event) {
    event.stopPropagation();

    event.target.classList.remove('over');
  }

  dragEnd() {
    const framesList = document.querySelectorAll('.frame');
    framesList.forEach(elem => elem.classList.remove('over'));
    const swappedFrames = document.querySelectorAll('.swapped');

    swappedFrames.forEach(elem => {
      const copyButton = elem.querySelector('#copyButton');
      const deleteButton = elem.querySelector('#deleteButton');

      copyButton.addEventListener('click', event => this.copyFrame(event), true);
      deleteButton.addEventListener('click', event => this.deleteFrame(event), true);
      this.dragAndDrop(elem);
      elem.classList.remove('swapped');
    });
  }
}
