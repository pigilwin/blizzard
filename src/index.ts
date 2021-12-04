import {random} from './helpers';
import {Flake, initialiseFlake, resetFlakeXPosition, resetFlakeYPosition, updateFlakePostition} from './flake';
import {doesCanvasExistOnDocument, getContext, appendCanvasToDocument, setCanvasSize} from './canvas';
export interface BlizzardConfiguration {
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

    /**
     * Should we randomise the colors
     */
    rgb: boolean;
}

export const defaultConfiguration: BlizzardConfiguration = {
    flakeCount: 100,
    flakeSize: 4,
    windSpeed: 1,
    rgb: false
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

    /**
     * Enable RGB on keyboard change
     */
    window.addEventListener('keydown', (e) => {

        if (e.code !== 'KeyR') {
            return;
        }

        if (e.code === 'KeyR' && e.ctrlKey) {
            config.rgb = !config.rgb;
        }

        flakes = createFlakes(config);
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
            drawFlake(context, config, flake);

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
        flakes.push(initialiseFlake(random(0, window.innerWidth, true), 0, config.rgb));
    }
    return flakes;
};

const drawFlake = (context: CanvasRenderingContext2D, configuration: BlizzardConfiguration, flake: Flake) => {
    context.font = '2em serif';
    context.beginPath();
    context.arc(flake.x, flake.y, configuration.flakeSize, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgba(' + flake.r + ', ' + flake.g + ', ' + flake.b + ', 1)';
    context.fill();
};