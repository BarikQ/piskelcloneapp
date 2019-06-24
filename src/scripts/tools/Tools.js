import Pen from './Pen/Pen';
import Bucket from './Bucket/Bucket';
import Stroke from './Stroke/Stroke';

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
