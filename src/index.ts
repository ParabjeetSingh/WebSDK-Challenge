/**
 * This file should demonstrate the configuration and use of the program by:
 * - Taking a configuration object from the user to configure the behavior where applicable.
 * - Start the processing of Images.
 * - Produce image quality feedback and display it on screen using the `index.html` file.
 * - Stop the processing as soon as the image quality is good.
 */


/**
 * TODO: design a configuration API so that a user of this program can specify the message that should
 * be displayed on screen for a given image quality assessment, for example: a user can decide to display
 * "Hold Still" when the sharpness has been assessed to the default "blurry" value, re-organize the project
 * structure as necessary. The configuration API should also allow the users to configure the time that the
 * feedback will be visible on screen.
 */


 /**
  * TODO: use the API you've designed to start the process, observe the feedback and display the feedback
  * on screen using the `index.html` template, modify the template as needed.
  */

 import { Config, outputObject } from "./config";
 import { ImageGenerator } from "./ImageGenerator";
 import { ImageController } from "./ImageController";

export class ImageQualityLibrary {
    private config: Config;
    private generator: ImageGenerator;
    private controller: ImageController;

    constructor(config?: Partial<Config>) {
        this.config = new Config(config);
        this.controller = new ImageController(this.config, this.displayFeedback.bind(this));
        this.generator = new ImageGenerator(this.controller.receiveImage.bind(this.controller));
        this.start();
    }
    private displayFeedback(obj: outputObject) {
        const feedbackElement = document.getElementById("feedback-display");
        const completeAnalysis=obj.completeAnalysis
        if (!feedbackElement) return;
        feedbackElement.innerText = obj.text;
        if (completeAnalysis)
            {
                this.stop();
                return
            }
        
        setTimeout(() => {
            feedbackElement.innerText = "";
        }, this.config.feedbackDuration);
    }

    start() {
        this.generator.start();
    }

    stop() {
        this.generator.stop();
    }
}

(window as any).ImageQualityLibrary = ImageQualityLibrary;

const lib = new ImageQualityLibrary({ feedbackDuration: 3000 });
