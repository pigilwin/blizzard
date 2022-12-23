import {random} from './helpers';
import {initialiseFlake, resetFlakeYPosition, updateFlakePostition} from './flake';
import {canvasId, createCanvasElement} from './canvas';
import { BlizzardConfiguration, BlizzardState, Flake } from './types';

const defaultConfiguration: BlizzardConfiguration = {
    flakeCount: 100,
    maxFlakeSize: 5,
    windSpeed: 1
};

export const initialiseBlizzard = (userRequestedConfig: BlizzardConfiguration = defaultConfiguration): void => {
    let canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement;
    /**
     * Check if the canvas does not exist on the document,
     * if it does not create a new element and append
     * it to the document and assign it
     */
    if (canvas === null) {
        canvas = createCanvasElement(
            window.innerWidth, 
            window.innerHeight
        );
        document.body.appendChild(canvas);
    }

    const config: BlizzardConfiguration = Object.assign(defaultConfiguration, userRequestedConfig);
    const state: BlizzardState = {
        context: canvas.getContext('2d'),
        height: canvas.height,
        width: canvas.width,
        flakes: createFlakes(config),
        tenPercentOfWidth: canvas.width / 10
    };

    /**
     * If the window size changes then resize the canvas
     */
    window.addEventListener('resize', () => {
        state.width = window.innerWidth;
        state.height = window.innerHeight;

        canvas.height = state.height;
        canvas.width = state.width;
    });

    const loop = () => {
        /**
         * Clear the canvas
         */
        state.context.clearRect(
            0,
            0,
            state.width,
            state.height
        );

        for (const flake of state.flakes){
            /**
             * Update the current flake position in the iteration
             */
            updateFlakePostition(
                flake,
                config.windSpeed
            );

            /**
             * Draw the flake on the canvas
             */
            drawFlake(state.context, flake);

            /**
             * If the flake y position is greater than the height of the canvas then
             * reset the flake to the top of the canvas
             */
            if (flake.y >= state.height) {
                resetFlakeYPosition(flake);
            }

            /**
             * If the flake goes off the screen to the right then begin shifting
             * the flake back between the length of the screen and 10 below the
             * length of the screen.
             */
            if (flake.x >= state.width) {
                flake.x = random(
                    state.width - state.tenPercentOfWidth,
                    state.width,
                    true
                );
            }

            /**
             * If the flake goes off the screen to the left then reset the
             * position to the x between 0 and 10 pixels
             */
            if (flake.x <= 0) {
                flake.x += random(
                    0,
                    state.tenPercentOfWidth,
                    true
                );
            }
        }

        /**
         * Register the next frame
         */
        requestAnimationFrame(() => {
            loop();
        });
    };

    /**
     * Initialise the main loop
     */
    loop();
};

const createFlakes = (config: BlizzardConfiguration): Array<Flake> => {
    const flakes: Array<Flake> = [];
    for (let i = 0; i < config.flakeCount; i++) {
        flakes.push(
            initialiseFlake(
                random(
                    0,
                    window.innerWidth,
                    true
                ),
                0,
                config.maxFlakeSize
            )
        );
    }
    return flakes;
};

const drawFlake = (context: CanvasRenderingContext2D, flake: Flake) => {
    context.font = '2em serif';
    context.beginPath();
    context.arc(
        flake.x,
        flake.y,
        flake.size,
        0,
        2 * Math.PI,
        false
    );
    context.fillStyle = 'rgba(255, 255, 255)';
    context.fill();
};
