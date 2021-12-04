import {random} from './helpers';
import {Flake} from './flake';
import {doesCanvasExistOnDocument, getConext, appendCanvasToDocument} from './canvas';
/**
export default class Blizzard {
    
    public start(): void {
        this.scaleCanvas();
        this.loop();
    }

    public scaleCanvas(): void {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }
    private loop(): void {

        let i: number = this.flakes.length;

        this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        while(i--) {
            const flake: Flake = this.flakes[i];
            flake.update(this.configuration.windSpeed);

            this.drawCharacterFlake(flake);

            if (flake.y >= this.canvas.height) {
                flake.resetFlakeToTop();
            }
        }

        requestAnimationFrame(() => {
            this.loop();
        });
    }

    private drawCharacterFlake(flake: Flake): void
    {
        this.canvas.context.font = '2em serif';
        this.canvas.context.beginPath();
        this.canvas.context.arc(flake.x, flake.y, this.configuration.flakeSize, 0, 2 * Math.PI, false);
        this.canvas.context.fillStyle = 'rgba(255, 255, 255, 1)';
        this.canvas.context.fill();
        
    }
}
*/
export interface BlizzardConfigurationItem {
    /**
     * How many flakes should be shown on the page at one time
     */
    flakeCount?: number;

    /**
     * What is the size of the flake?
    */
    flakeSize?: number;

    /**
     * What is the virtual wind speed of the application
     */
    windSpeed?: number;
}

export const defaultConfiguration: BlizzardConfigurationItem = {
    flakeCount: 100,
    flakeSize: 4,
    windSpeed: 1
};

export const initialiseBlizzard = (userRequestedConfig: BlizzardConfigurationItem = defaultConfiguration): void => {
    /**
     * Check if the canvas exists on the document
     */
    if (!doesCanvasExistOnDocument()) {
        /**
         * If it doesn't, create it
         */
        appendCanvasToDocument(window.innerWidth, window.innerHeight);
    }

    const config: BlizzardConfigurationItem = Object.assign(defaultConfiguration, userRequestedConfig);
    const flakes: Array<Flake> = createFlakes(config);

    return;
};

const createFlakes = (config: BlizzardConfigurationItem): Array<Flake> => {
    const flakes: Array<Flake> = [];
    for (let i = 0; i < config.flakeCount; i++) {
        flakes.push(new Flake(random(0, window.innerWidth, true), 0));
    }
    return flakes;
};