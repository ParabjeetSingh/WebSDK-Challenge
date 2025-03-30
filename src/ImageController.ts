import { Image } from "./Image";
import {Config,outputObject} from "./config";

export class ImageController {
    private latestImage: Image | null = null;
    private processing: boolean = false;
    private config: Config;
    private displayFeedback: (obj: outputObject) => void;

    constructor(config: Config, displayFeedback: (obj: outputObject) => void) {
        this.config = config;
        this.displayFeedback = displayFeedback;
    }

    receiveImage(image: Image) {
        this.latestImage = image;
        this.processNextImage();
    }

    private async processNextImage() {
        if (this.processing || !this.latestImage) return;

        this.processing = true;
        const image = this.latestImage;
        this.latestImage = null;
        
        await new Promise(res => setTimeout(res, 500));

        let feedback = {text:"",completeAnalysis:false};
        if (image.sharpness < 0.3) feedback = {text:this.config.feedbackText.sharpness,completeAnalysis:false};
        else if (image.exposure > 0.7) feedback = {text:this.config.feedbackText.exposureHigh,completeAnalysis:false};
        else if (image.exposure < 0.3) feedback = {text:this.config.feedbackText.exposureLow,completeAnalysis:false};
        else if (image.contrast < 0.3) feedback = {text:this.config.feedbackText.contrastLow,completeAnalysis:false};
        else feedback = {text:this.config.feedbackText.good,completeAnalysis:true};
        

        this.displayFeedback(feedback);
        setTimeout(() => this.processing = false, this.config.feedbackDuration);
    }
}