import {random} from './helpers';
import {initialiseFlake, resetFlakeXPosition, resetFlakeYPosition, updateFlakePostition} from './flake';
import {doesCanvasExistOnDocument, getContext, appendCanvasToDocument, setCanvasSize} from './canvas';
import { BlizzardConfiguration, Flake } from './types';

const defaultConfiguration: BlizzardConfiguration = {
    flakeCount: 100,
    maxFlakeSize: 5,
    windSpeed: 1
};

export const initialiseBlizzard = (userRequestedConfig: BlizzardConfiguration = defaultConfiguration): void => {
    /**
     * Check if the canvas exists on the document
     */
    if (!doesCanvasExistOnDocument()) {
        /**
         * If it doesn't, create it
         */
        appendCanvasToDocument(window.innerWidth, window.innerHeight);
    }

    const config: BlizzardConfiguration = Object.assign(defaultConfiguration, userRequestedConfig);

    /**
     * Create a list of flakes
     */
    let flakes: Array<Flake> = createFlakes(config);

    /**
     * If the window size changes then resize the canvas
     */
    window.addEventListener('resize', () => {
        setCanvasSize(window.innerWidth, window.innerHeight);
    });

    const context = getContext();

    const loop = () => {

        let i: number = flakes.length;

        /**
         * Clear the canvas
         */
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        while(i--) {
            const flake: Flake = flakes[i];

            /**
             * Update the current flake position in the interation
             */
            updateFlakePostition(flake, config.windSpeed);

            /**
             * Draw the flake on the canvas
             */
            drawFlake(context, flake);

            /**
             * If the flake y position is greater than the height of the canvas then
             * reset the flake to the top of the canvas
             */
            if (flake.y >= context.canvas.height) {
                resetFlakeYPosition(flake);
            }

            /**
             * If the flake x position is less than 0 or the flake x position is greater 
             * than the width of the canvas then randomise the position
             */
            if (flake.x >= context.canvas.width || flake.x <= 0) {
                resetFlakeXPosition(flake, random(0, window.innerWidth, true));
            }
        }

        /**
         * Register the next frame
         */
        requestAnimationFrame(() => {
            loop();
        });
    };

    loop();

    return;
};

const createFlakes = (config: BlizzardConfiguration): Array<Flake> => {
    const flakes: Array<Flake> = [];
    for (let i = 0; i < config.flakeCount; i++) {
        flakes.push(initialiseFlake(random(0, window.innerWidth, true), 0, config.maxFlakeSize));
    }
    return flakes;
};

const drawFlake = (context: CanvasRenderingContext2D, flake: Flake) => {
    context.font = '2em serif';
    context.beginPath();
    context.arc(flake.x, flake.y, flake.size, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgba(255, 255, 255)';
    context.fill();
};