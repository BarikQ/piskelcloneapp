/* eslint-disable no-unused-vars */

export default class Preview {
  getParent() {
    const parent = document.querySelector('#preview');
    return parent;
  }

  getChild() {
    return this.getParent().childNodes[0];
  }

  showRate() {
    const rng = document.querySelector('#frame_rate');

    rng.addEventListener('input', () => {
      const rngValue = document.querySelector('#fps_value');
      rngValue.innerHTML = rng.value;
    });

    return rng.value;
  }
}
