import Menu from './components/Menu';

import GSAP from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
GSAP.registerPlugin(ScrollTrigger);

import normalizeWheel from 'normalize-wheel';

import { Detection } from './classes/Detection';

class App {
	constructor() {
		this.gallery = document.querySelector('.gallery');
		this.galleries = [
			this.gallery.querySelector('.gallery__one'),
			this.gallery.querySelector('.gallery__two'),
			this.gallery.querySelector('.gallery__three'),
		];
		this.boxes = document.querySelectorAll('.gallery__img');

		this.currentY = 0;
		this.previousY = 0;

		this.create();
		this.createTimeline();
		this.addEventListeners();

		this.update();
	}

	create() {
		this.menu = new Menu();
	}

	createTimeline() {
		if (Detection.isMobile) return;

		this.timeline = GSAP.timeline({
			scrollTrigger: {
				trigger: this.gallery,
				pin: true,
				pinSpacing: false,
				scrub: 1,
			},
		});

		this.galleries.forEach((gallery, index) => {
			this.timeline.to(
				gallery,
				{
					yPercent: -100,
					duration: 1 + ((index * 0.5) % 1),
				},
				0
			);
		});
	}

	addEventListeners() {
		window.addEventListener('wheel', (event) => {
			const { pixelY } = normalizeWheel(event);
			this.currentY += pixelY / 100;
		});
	}
	update() {
		this.frame = window.requestAnimationFrame(this.update.bind(this));

		this.currentY = GSAP.utils.interpolate(this.currentY, this.previousY, 0.1);
		this.currentY = GSAP.utils.clamp(-4, 4, this.currentY);

		GSAP.to(this.boxes, {
			skewX: `${this.currentY * 0.2}deg`,
			rotateX: `${this.currentY * 0.2}deg`,
			duration: 1,
			ease: 'power4.out',
		});
	}
}

new App();
