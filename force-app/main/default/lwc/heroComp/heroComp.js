import hero from '@salesforce/resourceUrl/hero_img';
import { LightningElement, track } from 'lwc';

export default class InteractiveHero extends LightningElement {
    @track slideIndex = 0;
    images = [
        { id: 1, src: hero + '/hero/1704114588628.jpeg', alt: 'Image 1' },
        // { id: 2, src: hero + '/hero/1703863734611.jpeg', alt: 'Image 2' },
        // { id: 3, src: hero + '/hero/1.jpg', alt: 'Image 1' },
        // { id: 4, src: hero + '/hero/2.jpg', alt: 'Image 2' },
        // { id: 5, src: hero + '/hero/4.jpg', alt: 'Image 4' },
        // { id: 6, src: hero + '/hero/5.jpg', alt: 'Image 5' },
        // { id: 7, src: hero + '/hero/6.jpg', alt: 'Image 6' },
    ];

    connectedCallback() {
        this.startSlideShow();
    }

    startSlideShow() {
        setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    nextSlide() {
        this.slideIndex = (this.slideIndex + 1) % this.images.length;
    }

    prevSlide() {
        this.slideIndex = (this.slideIndex - 1 + this.images.length) % this.images.length;
    }

    exploreCommunity() {
        // Add logic to navigate to the community page or handle exploration
        // You can use NavigationMixin to navigate to another page in a real scenario.
    }
}
