import { random } from './helpers';
import { Flake, initialiseFlake } from './flake';
import { canvasId, createCanvasElement } from './canvas';
import { BlizzardConfiguration, BlizzardState } from './types';

const defaultConfiguration: BlizzardConfiguration = {
    flakeCount: 100,
    maxFlakeSize: 5,
    windSpeed: 3,
    stickyCount: null
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
        flakes: [],
        windSpeed: config.windSpeed,
        stickyCount: config.stickyCount
    };
    state.flakes = createFlakes(config, state);

    /**
     * If the window size changes then resize the canvas
     */
    window.addEventListener('resize', () => {
        state.width = window.innerWidth;
        state.height = window.innerHeight;

        canvas.height = state.height;
        canvas.width = state.width;
    });

    const onAnimationFrame = () => {
        /**
         * Clear the canvas
         */
        state.context.clearRect(
            0,
            0,
            state.width,
            state.height
        );

        for (const flake of state.flakes) {

            /**
             * Update the flake properties
             */
            flake.update(
                state.width,
                state.height,
                config.stickyCount
            );

            /**
             * Draw the flake on the canvas
             */
            drawFlake(state.context, flake);
        }

        /**
         * Register the next frame
         */
        window.requestAnimationFrame(onAnimationFrame);
    };

    /**
     * Initialise the main loop
     */
    window.requestAnimationFrame(onAnimationFrame);
};

const createFlakes = (config: BlizzardConfiguration, state: BlizzardState): Array<Flake> => {
    const flakes: Array<Flake> = [];
    for (let i = 0; i < config.flakeCount; i++) {
        flakes.push(
            initialiseFlake(
                state.width,
                state.windSpeed,
                random(1, config.maxFlakeSize, false),
            )
        );
    }
    return flakes;
};

const drawFlake = (context: CanvasRenderingContext2D, flake: Flake) => {
    context.font = '2em serif';
    context.beginPath();
    context.arc(
        flake.location.x,
        flake.location.y,
        flake.size,
        0,
        2 * Math.PI,
        false
    );
    context.fillStyle = 'rgba(255, 255, 255)';
    context.fill();
};
