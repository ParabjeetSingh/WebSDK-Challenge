/**
 * Represents an image with quality properties.
 */
export class Image {
    sharpness: number;
    exposure: number;
    contrast: number;
    timestamp: number;

    constructor() {
        this.sharpness = Math.random();
        this.exposure = Math.random();
        this.contrast = Math.random();
        this.timestamp = Date.now();
    }
}
