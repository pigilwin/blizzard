import {Helpers} from './helpers';
import {Flake} from './flake';
import {Canvas} from './canvas';
import { Wind } from './wind';

export default class Blizzard {

    public readonly canvas: Canvas;
    public readonly wind: Wind;

    private configuration: BlizzardConfigurationItem;
    private flakes: Array<Flake> = [];

    /**
     * Create a new blizzard
     * @param {BlizzardConfigurationItem} config 
     */
    public constructor(config: BlizzardConfigurationItem = {}) {
        this.configuration = Object.assign(this.defaultConfiguration(), config);
        this.canvas = new Canvas(window.innerHeight, window.innerWidth);
        this.wind = new Wind();
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
        const possibleCharacters: Array<string> = this.configuration.flakeCharacters;

        while(i--) {
            
            let character: string = this.configuration.flakeCharacter;
            if (possibleCharacters.length > 0) {
                const index: number = Helpers.random(0, possibleCharacters.length - 1, true);
                character = possibleCharacters[index];
            }

            this.flakes.push(new Flake(
                Helpers.random(0, this.canvas.width, true), 
                0,
                character
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

            if (!this.configuration.avoidMouse) {
                this.wind.updateFlake(flake);
            }

            this.drawCharacterFlake(x, y, flake.character);

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
     * @param {string} character
     * @returns {void}
     */
    private drawCharacterFlake(x: number, y: number, character: string): void
    {
        this.canvas.context.font = '2em serif';
        this.canvas.context.fillText(character, x, y);
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
            flakeCharacters: ['❄️','🍻'],
            windSpeed: 5,
            avoidMouse: false
        };
    }
}

export interface BlizzardConfigurationItem {
    /**
     * How many flakes should be shown on the page at one time
     */
    flakeCount?: number;

    /**
     * What is the virtual wind speed of the application
     */
    windSpeed?: number;

    /**
     * What character should be shown when displaying the flake
     */
    flakeCharacter?: string;

    /**
     * What characters should be shown at random
     */
    flakeCharacters?: Array<string>;

    /**
     * Should the snow flakes react to the mouse
     */
    avoidMouse?: boolean;
}