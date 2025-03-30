export class Config {
    feedbackText: { [key: string]: string };
    feedbackDuration: number;

    constructor(config?: Partial<Config>) {
        this.feedbackText = config?.feedbackText || {
            sharpness: "blurry",
            exposureHigh: "too bright",
            exposureLow: "too dark",
            contrastLow: "low contrast",
            good: "ok"
        };
        this.feedbackDuration = config?.feedbackDuration || 2000;
    }
}

export interface outputObject {
    text: string;
    completeAnalysis: boolean;
}