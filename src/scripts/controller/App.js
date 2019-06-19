import Canvas from '../Canvas';
import Tools from '../tools/Tools';
import Frames from '../frames/Frames';
import Preview from '../preview/Preview';

export default class App {
  constructor() {
    this.penSize = 1;
  }

  start() {
    const mainCanvas = new Canvas(800, 800, 'mainCanvas', 'mainCanvas');
    const tools = new Tools();
    const frames = new Frames();
    const preview = new Preview();

    const canvasContainer = document.querySelector('.canvas-main-container');
    const frame0Container = document.querySelector('#frame_0');
    const addButton = document.querySelector('#add-btn');
    const toolsList = document.querySelectorAll('.tool');

    preview.showRate();

    canvasContainer.appendChild(mainCanvas.create().canvas);
    frame0Container.appendChild(mainCanvas.convertToImg('200px'));
    preview.getParent().appendChild(mainCanvas.convertToImg('200px'));

    toolsList.forEach(element => {
      element.addEventListener('click', () => tools.active(element, '.tool'));
    });

    frame0Container.addEventListener('click', () => tools.active(frame0Container, '.frame'));
    frame0Container.addEventListener('click', () => mainCanvas.refresh());

    toolsList[0].addEventListener('click', tools.PenTool);
    toolsList[1].addEventListener('click', tools.BucketTool);
    toolsList[2].addEventListener('click', tools.StrokeTool);

    addButton.addEventListener('click', frames.addFrame);

    mainCanvas.getCanvas().canvas.addEventListener('mouseup', frames.render);
    mainCanvas.getCanvas().canvas.addEventListener('mouseout', frames.render);

    preview.getChild();
  }
}
