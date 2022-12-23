import {random} from './helpers';
import {initialiseFlake, updateFlakePosition} from './flake';
import {canvasId, createCanvasElement} from './canvas';
import { BlizzardConfiguration, BlizzardState, Flake } from './types';

const defaultConfiguration: BlizzardConfiguration = {
    flakeCount: 100,
    maxFlakeSize: 5,
    windSpeed: 5
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
        tenPercentOfWidth: canvas.width / 10,
        windSpeed: random(0.2, config.windSpeed, false),
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
            updateFlakePosition(
                flake,
                state
            );
            /**
             * Draw the flake on the canvas
             */
            drawFlake(state.context, flake);
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

const createFlakes = (config: BlizzardConfiguration, state: BlizzardState): Array<Flake> => {
    const flakes: Array<Flake> = [];
    for (let i = 0; i < config.flakeCount; i++) {
        flakes.push(
            initialiseFlake(
                state.width,
                config.maxFlakeSize,
                state.windSpeed
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
