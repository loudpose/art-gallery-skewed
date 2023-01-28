import Menu from './components/Menu';
import GSAP from 'gsap';
import normalizeWheel from 'normalize-wheel';

class App {
  constructor() {
    this.boxes = document.querySelectorAll('.gallery__img');

    this.currentY = 0;
    this.previousY = 0;

    this.create();
    this.addEventListeners();
    this.update();
  }

  create() {
    this.menu = new Menu();
  }

  addEventListeners() {
    window.addEventListener('mousewheel', (event) => {
      const { pixelY } = normalizeWheel(event);
      this.currentY += pixelY / 100;
    });
  }
  update() {
    this.frame = window.requestAnimationFrame(this.update.bind(this));

    this.currentY = GSAP.utils.clamp(-4, 4, this.currentY);
    this.currentY = GSAP.utils.interpolate(this.currentY, this.previousY, 0.03);
    this.boxes.forEach(
      (box) =>
        (box.style.transform = `skewX(${this.currentY * 0.2}deg) rotateX(${
          this.currentY
        }deg)`)
    );
  }
}

new App();
