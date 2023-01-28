import GSAP from 'gsap';
import MenuLink from './MenuLink.js';

export default class Menu {
  constructor() {
    this.element = document.querySelector('.menu');
    this.elements = {
      icon: document.querySelector('.nav__menu__icon'),
      mainImg: document.querySelector('.menu__right__item img'),
      mainImgText: document.querySelector('.menu__right__item figcaption'),
      menuLinks: document.querySelectorAll('.menu__item'),
      menuImages: document.querySelectorAll('.menu__item__image--link img'),
    };

    this.isRunning = false;
    this.state = false; // false - closed, true - open

    this.createTimeline();
    this.addEventListeners();
  }
  createTimeline() {
    this.timeline = GSAP.timeline({ paused: true });

    this.timeline.fromTo(this.element, { autoAlpha: 0 }, { autoAlpha: 1 });

    this.timeline.fromTo(
      this.elements.menuLinks,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.24,
        stagger: 0.05,
        ease: 'power.out4',
      }
    );

    this.timeline
      .fromTo(
        this.elements.mainImg,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.7,
        }
      )
      .fromTo(
        this.elements.mainImgText,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.7,
        },
        '-=0.3'
      );
  }

  toggleState() {
    if (this.isRunning) return;

    this.state = !this.state;
    this.updateUI();
  }

  updateUI() {
    if (!this.state) {
      this.timeline.timeScale(1.5);
      this.timeline.reverse();
      this.elements.icon.classList.remove('nav__menu__icon--active');
    } else {
      this.timeline.timeScale(1);
      this.timeline.play();
      this.elements.icon.classList.add('nav__menu__icon--active');
    }
  }

  addEventListeners() {
    this.elements.icon.addEventListener('click', this.toggleState.bind(this));
    const arr = [...this.elements.menuLinks];
    arr.map((el, i) => {
      el.addEventListener(
        'mouseover',
        () => (this.elements.mainImg.src = this.elements.menuImages[i].src)
      );
    });
  }
}
