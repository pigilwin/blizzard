import {BlizzardConfigurationItem} from './types';
import {Helpers} from './helpers';
import {Flake} from './flake';
import {Canvas} from './canvas';

enum Direction {LEFT, RIGHT}

export default class Blizzard {

    private readonly spacer: number = 50;

    private configuration: BlizzardConfigurationItem;
    private canvas: Canvas;
    private flakes: Array<Flake> = [];
    private direction: Direction = Direction.LEFT;
    private mouseMovementX = 0;

    /**
     * Create a new blizzard
     * @param {BlizzardConfigurationItem} config 
     */
    public constructor(config: BlizzardConfigurationItem = {}) {
        this.configuration = Object.assign(this.defaultConfiguration(), config);
        this.canvas = new Canvas(window.innerHeight, window.innerWidth);
        this.load();
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
        let i: number = this.configuration.flakeCount;

        while(i--) {
            this.flakes.push(new Flake(
                Helpers.random(0, this.canvas.width, true), 
                0
            ));
        }
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
     * Apply a mouse event to the blizzard instance
     * @param {MouseEvent} e
     * @returns {void} 
     */
    public applyMouseEvent(e: MouseEvent): void {
        if (e.pageX < this.mouseMovementX) {
            this.direction = Direction.LEFT;
        } else if (e.pageX > this.mouseMovementX) {
            this.direction = Direction.RIGHT;
        }
        this.mouseMovementX = e.pageX;
    }

    /**
     * Loop each annimation frame
     * @returns {void}
     */
    private loop(): void {

        let i: number = this.flakes.length;

        this.canvas.context.save();
        this.canvas.context.setTransform(1, 0, 0, 1, 0, 0);
        this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.context.restore();

        while(i--) {
            const flake: Flake = this.flakes[i];
            flake.update();

            const y: number = flake.y;
            const x: number = flake.x;

            /**
            if (!this.configuration.avoidMouse) {
                if (x >= (this.mouseMovementX - this.spacer)) {
                    x -= this.spacer;
                }

                if (x <= (this.mouseMovementX + this.spacer)) {
                    x += this.spacer;
                }
            }
            */

            this.drawCharacterFlake(x, y);

            if (y >= this.canvas.height) {
                flake.resetFlakeToTop();
            }
        }

        requestAnimationFrame(() => {
            this.loop();
        });
    }

    /**
     * Draw a character
     * @param {number} x 
     * @param {number} y
     * @returns {void}
     */
    private drawCharacterFlake(x: number, y: number): void
    {
        //console.log(x, y);
        this.canvas.context.font = '2em serif';
        this.canvas.context.fillText(this.configuration.flakeCharacter, x, y);
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