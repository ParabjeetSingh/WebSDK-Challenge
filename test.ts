// imageQualityLibrary.ts

interface ImageQuality {
    sharpness: number;
    exposure: number;
    contrast: number;
}

interface Config {
    feedbackText?: {
        blurry?: string;
        bright?: string;
        dark?: string;
        contrast?: string;
        ok?: string;
    };
    feedbackDuration?: number;
}

class ImageGenerator {
    private callback: (image: ImageQuality) => void;
    private intervalId: ReturnType<typeof setInterval> | null = null;
    
    constructor(callback: (image: ImageQuality) => void) {
        this.callback = callback;
    }
    
    start() {
        this.intervalId = setInterval(() => {
            const image: ImageQuality = {
                sharpness: Math.random(),
                exposure: Math.random(),
                contrast: Math.random(),
            };
            this.callback(image);
        }, 200);
    }
    
    stop() {
        if (this.intervalId) clearInterval(this.intervalId);
    }
}

class ImageProcessor {
    private latestImage: ImageQuality | null = null;
    private processing = false;
    private callback: (feedback: string) => void;
    private config: Config;
    
    constructor(callback: (feedback: string) => void, config: Config) {
        this.callback = callback;
        this.config = config;
    }
    
    analyze(image: ImageQuality) {
        if (this.processing) return;
        this.processing = true;
        this.latestImage = image;

        setTimeout(() => {
            let feedback = this.getFeedback(this.latestImage!);
            this.callback(feedback);
            this.processing = false;
        }, 500);
    }
    
    private getFeedback(image: ImageQuality): string {
        if (image.sharpness < 0.3) return this.config.feedbackText?.blurry || "blurry";
        if (image.exposure > 0.7) return this.config.feedbackText?.bright || "too bright";
        if (image.exposure < 0.3) return this.config.feedbackText?.dark || "too dark";
        if (image.contrast < 0.3) return this.config.feedbackText?.contrast || "low contrast";
        return this.config.feedbackText?.ok || "ok";
    }
}

class FeedbackManager {
    private timeoutId: ReturnType<typeof setTimeout> | null = null;
    
    showFeedback(feedback: string, duration: number) {
        console.log(`Feedback: ${feedback}`);
        if (this.timeoutId) clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => console.log("Feedback cleared"), duration);
    }
}

class MiniLibrary {
    private imageGenerator: ImageGenerator;
    private imageProcessor: ImageProcessor;
    private feedbackManager: FeedbackManager;
    private config: Config;
    
    constructor(config: Config = {}) {
        this.config = {
            feedbackText: {
                blurry: "blurry",
                bright: "too bright",
                dark: "too dark",
                contrast: "low contrast",
                ok: "ok",
                ...config.feedbackText,
            },
            feedbackDuration: config.feedbackDuration || 2000,
        };
        this.feedbackManager = new FeedbackManager();
        this.imageProcessor = new ImageProcessor(
            (feedback) => this.feedbackManager.showFeedback(feedback, this.config.feedbackDuration!),
            this.config
        );
        this.imageGenerator = new ImageGenerator((image) => this.imageProcessor.analyze(image));
    }
    
    start() {
        this.imageGenerator.start();
    }
    
    stop() {
        this.imageGenerator.stop();
        console.log("Processing stopped");
    }
}

// Example Usage
const library = new MiniLibrary({ feedbackDuration: 3000, feedbackText: { blurry: "image is not sharp" } });
library.start();

setTimeout(() => library.stop(), 10000);
