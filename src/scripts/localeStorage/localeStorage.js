import Instruments from '../instruments/instruments';
import Canvas from '../Canvas/Canvas';
import Frames from '../frames/Frames';

const mainCanvas = new Canvas(800, 800, 'mainCanvas', 'mainCanvas');
const instruments = new Instruments();
const frames = new Frames();

export default class localStorageClass {
  save() {
    const framesData = document.querySelector('#frames-list');
    localStorage.setItem('frames', framesData.outerHTML);
    console.log(framesData.outerHTML);
    console.log(localStorage.getItem('frames'));
  }

  render() {
    if (!localStorage.getItem('frames')) return;
    const framesData = document.querySelector('#frames-list');

    framesData.outerHTML = localStorage.getItem('frames');

    const framesList = document.querySelectorAll('.frame');
    const addButton = document.querySelector('#add-btn');

    framesList.forEach(elem => {
      instruments.setFramesIventListeners(elem);
      elem.addEventListener('click', () => instruments.active(elem, '.frame'));
      elem.addEventListener('click', () => mainCanvas.refresh());
      elem.addEventListener('dragstart', () => frames.dragAndDrop(elem));
      frames.dragAndDrop(elem);
    });
    mainCanvas.refresh();
    addButton.addEventListener('click', () => frames.addFrame());
  }

  clearStorage() {
    localStorage.clear();
  }
}