export default class Canvas {
  constructor(height, width, classT, idT) {
    this.height = height;
    this.width = width;
    this.classT = classT;
    this.idT = idT;
  }

  create() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = this.width;
    canvas.height = this.height;
    canvas.className = this.classT;
    canvas.id = this.idT;
    ctx.fillStyle = '#343a40';
    ctx.fillRect(0, 0, this.height, this.width);
    const obj = {};
    obj.canvas = canvas;
    obj.ctx = ctx;

    return obj;
  }

  getCanvas() {
    const obj = {};
    obj.canvas = document.querySelector(`#${this.idT}`);
    obj.ctx = obj.canvas.getContext('2d');

    return obj;
  }

  cloneCanvas(childCanvas, width, height) {
    const newCtx = childCanvas.getContext('2d');
    newCtx.clearRect(0, 0, width, height);
    newCtx.drawImage(this.getCanvas().canvas, 0, 0, width, height);

    return newCtx;
  }

  clearCanvas() {
    this.getCanvas().ctx.fillStyle = '#343a40';
    this.getCanvas().ctx.fillRect(0, 0, this.height, this.width);
  }

  convertToImg(size) {
    const framesList = document.querySelectorAll('.frame');
    const imgUrl = this.getCanvas().canvas.toDataURL();
    const img = new Image();
    img.src = imgUrl;
    img.style.width = size;
    img.style.height = size;
    img.classList = 'imgFrame';
    img.id = `frame_img_${framesList.length - 1}`;

    return img;
  }

  refresh() {
    const framesList = document.querySelectorAll('.frame');
    let activeFrame = null;

    framesList.forEach(elem => {
      if (elem.classList.contains('active')) activeFrame = elem;
    });

    const activeImg = activeFrame.querySelector('.imgFrame');

    this.clearCanvas();

    this.getCanvas().ctx.drawImage(activeImg, 0, 0, 800, 800);
  }
}
