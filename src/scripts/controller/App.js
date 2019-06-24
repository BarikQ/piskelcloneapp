import Canvas from '../Canvas';
import Tools from '../tools/Tools';
import Frames from '../frames/Frames';
import Instruments from '../instruments/instruments';
import Preview from '../preview/Preview';
import LocaleStorageClass from '../localeStorage/localeStorage';

export default class App {
  constructor() {
    this.penSize = 1;
  }

  start() {
    const mainCanvas = new Canvas(800, 800, 'mainCanvas', 'mainCanvas');
    const tools = new Tools();
    const frames = new Frames();
    const preview = new Preview();
    const instruments = new Instruments();
    const localStorageClass = new LocaleStorageClass();

    const canvasContainer = document.querySelector('.canvas-main-container');
    const frame0Container = document.querySelector('#frame_0');
    const addButton = document.querySelector('#add-btn');
    const toolsList = document.querySelectorAll('.tool');
    const fullScr = document.querySelector('#fullScreen');
    const copyButton = document.querySelector('#copyButton');
    const deleteButton = document.querySelector('#deleteButton');
    const saveDataButton = document.querySelector('#saveButton');
    const clearDataButton = document.querySelector('#clearButton');
    const renderDataButton = document.querySelector('#renderButton');
    const downloadButton = document.querySelector('#downloadButton');

    preview.showRate();

    canvasContainer.appendChild(mainCanvas.create().canvas);
    frame0Container.appendChild(mainCanvas.convertToImg('200px'));

    toolsList.forEach(element => {
      element.addEventListener('click', () => instruments.active(element, '.tool'));
    });

    frame0Container.addEventListener('click', () => instruments.active(frame0Container, '.frame'));
    frame0Container.addEventListener('click', () => mainCanvas.refresh());
    frame0Container.addEventListener('dragstart', () => frames.dragAndDrop(frame0Container));

    frames.dragAndDrop(frame0Container);

    tools.addEventListeners();

    addButton.addEventListener('click', () => frames.addFrame());
    copyButton.addEventListener('click', event => frames.copyFrame(event), true);
    deleteButton.addEventListener('click', event => frames.deleteFrame(event), true);
    saveDataButton.addEventListener('click', localStorageClass.save);
    clearDataButton.addEventListener('click', localStorageClass.clearStorage);
    renderDataButton.addEventListener('click', localStorageClass.render);

    mainCanvas.getCanvas().canvas.addEventListener('mouseup', () => {
      frames.render();
    });
    mainCanvas.getCanvas().canvas.addEventListener('mouseout', frames.render);

    fullScr.addEventListener('click', () => instruments.fullScreen(preview.getParent()));

    instruments.showCanvasInfo();
    preview.startAnimation(0);

    downloadButton.addEventListener('click', instruments.downloadGif);
  }
}
