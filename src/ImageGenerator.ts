import { Image } from './Image';

export class ImageGenerator {
    private intervalId: NodeJS.Timeout | null = null;
    private callback: (image: Image) => void;

    constructor(callback: (image: Image) => void) {
        this.callback = callback;
    }

    start() {
        this.intervalId = setInterval(() => {
            this.callback(new Image());
        }, 200);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}