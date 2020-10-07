import {BlizzardConfigurationItem} from './types';
import {Helpers} from './helpers';
import {Flake} from './flake';

export default class Blizzard {
    private configuration: BlizzardConfigurationItem;
    private flakes: Array<Flake> = [];
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private windowWidth = 0;
    private windowHeight = 0;
    private loaded = false;
    private mouseX = -100;

    public constructor(private config: BlizzardConfigurationItem = {}) {
        this.configuration = Object.assign(this.defaultConfiguration(), config);
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
        this.canvas = document.createElement('canvas');
        this.context = <CanvasRenderingContext2D> this.canvas.getContext('2d');
        this.setCanvasStyle();
        document.body.appendChild(this.canvas);

        if (!this.loaded) {
            this.load();
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
     * Load the flakes into the instance
     * @returns {void}
     */
    private load(): void {
        if (this.loaded) {
            return;
        }

        let i: number = this.configuration.flakeCount;

        while(i--) {
            const x: number = Helpers.random(0, this.windowWidth, true);
            const y: number = Helpers.random(0, this.windowHeight, true);
            this.flakes.push(new Flake(x, y));
        }

        this.loaded = true;
    }

    /**
     * Scale the canvas to the screen
     * @returns {void}
     */
    public scaleCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * Apply a mouse event to the blizzard instance
     * @param {MouseEvent} e
     * @returns {void} 
     */
    public applyMouseEvent(e: MouseEvent): void {
        this.mouseX = e.clientX;
    }

    /**
     * Loop each annimation frame
     * @returns {void}
     */
    private loop(): void {

        let i: number = this.flakes.length;

        this.context.save();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.context.restore();

        while(i--) {
            const flake: Flake = this.flakes[i];
            flake.update();

            const y: number = flake.getY();
            const x: number = flake.getX();

            this.drawCharacterFlake(x, y);

            if (y >= window.innerHeight) {
                flake.removeWeightFromY();
            }
        }

        requestAnimationFrame(() => {
            this.loop();
        });
    }
    
    private setCanvasStyle(): void {
        this.canvas.height = this.windowHeight;
        this.canvas.width = this.windowWidth;
        this.canvas.style.margin = '0';
        this.canvas.style.padding = '0';
        this.canvas.style.position = 'fixed';
        this.canvas.style.touchAction = 'none';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
    }

    /**
     * Draw a character
     * @param x 
     * @param y 
     * @param flake 
     * @returns {void}
     */
    private drawCharacterFlake(x: number, y: number): void
    {
        this.context.font = '2em serif';
        this.context.fillText(this.configuration.flakeCharacter, x, y);
    }

    /**
     * Fetch the default blizzard configuration item
     * @returns {BlizzardConfigurationItem}
     */
    private defaultConfiguration(): BlizzardConfigurationItem
    {
        return {
            flakeCount: 100,
            flakeCharacter: '❄️',
            windSpeed: 5,
            avoidMouse: false
        };
    }
}