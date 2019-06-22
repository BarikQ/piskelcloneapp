/* eslint-disable no-unused-vars */
import Pen from './Pen/Pen';
import Bucket from './Bucket/Bucket';
import Stroke from './Stroke/Stroke';
import Canvas from '../Canvas/Canvas';

const mainCanvas = new Canvas(800, 800, 'mainCanvas');

export default class Tools {
  PenTool() {
    const PenTool = new Pen();

    PenTool.draw();
  }

  BucketTool() {
    const BucketTool = new Bucket();

    BucketTool.render();
  }

  StrokeTool() {
    const StrokeTool = new Stroke();

    StrokeTool.render();
  }
}
