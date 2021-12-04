import {random} from './helpers';
import {Flake} from './flake';
import {Canvas} from './canvas';

export default class Blizzard {

    public readonly canvas: Canvas;

    private configuration: BlizzardConfigurationItem;
    private flakes: Array<Flake> = [];

    /**
     * Create a new blizzard
     * @param {BlizzardConfigurationItem} config 
     */
    public constructor(config: BlizzardConfigurationItem = {}) {
        this.configuration = Object.assign(this.defaultConfiguration(), config);
        this.canvas = new Canvas(window.innerHeight, window.innerWidth);

        for (let i = 0; i < this.configuration.flakeCount; i++) {
            this.flakes.push(new Flake(random(0, this.canvas.width, true), 0));   
        }
    } 

    /**
     * Start the canvas
     * @returns {void}
     */
    public start(): void {
        this.scaleCanvas();
        this.loop();
    }

    /**
     * Scale the canvas to the screen
     * @returns {void}
     */
    public scaleCanvas(): void {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }

    /**
     * Loop each annimation frame
     * @returns {void}
     */
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

    /**
     * Draw a character flake
     * @returns {void}
     */
    private drawCharacterFlake(flake: Flake): void
    {
        this.canvas.context.font = '2em serif';
        this.canvas.context.beginPath();
        this.canvas.context.arc(flake.x, flake.y, this.configuration.flakeSize, 0, 2 * Math.PI, false);
        this.canvas.context.fillStyle = 'rgba(255, 255, 255, 1)';
        this.canvas.context.fill();
        
    }

    /**
     * Fetch the default blizzard configuration item
     * @returns {BlizzardConfigurationItem}
     */
    private defaultConfiguration(): BlizzardConfigurationItem
    {
        return {
            flakeCount: 100,
            flakeSize: 4,
            windSpeed: 1
        };
    }
}

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