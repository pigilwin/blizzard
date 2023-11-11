import {random} from './helpers';
import {BlizzardState, Flake, WindDirection} from './types';

const maxWeight = 5;

export const initialiseFlake = (
    width: number,
    maxFlakeSize: number,
    windSpeed: number
): Flake => {
    const half = width / 2;
    const startPosition = random(0, width, true);
    return {
        location: {
            x: startPosition,
            y: 0
        },
        wind: windSpeed,
        weight: random(3, maxWeight, false) / maxWeight,
        size: random(1, maxFlakeSize, false),
        direction: startPosition >= width ? WindDirection.blowLeft : WindDirection.blowRight
    };
};

export const updateFlakePosition = (flake: Flake, state: BlizzardState): void => {
    /**
     * If the flake y position is greater than the height of the canvas then
     * reset the flake to the top of the canvas
     */
    if (flake.location.y >= state.height) {
        flake.location.y = 0;
        flake.location.x = random(0, state.width, true);
    }

    /**
     * If the flake goes off the screen to the right then
     * instruct the wind to force the flake back to the left
     */
    if (flake.location.x >= state.width) {
        flake.direction = WindDirection.blowLeft;
    }

    /**
     * If the flake goes off the screen to the left then
     * instruct the wind to force the flake back to the right
     */
    if (flake.location.x <= 0) {
        flake.direction = WindDirection.blowRight;
    }

    const newPositionBasedOnWind = calculateWind(flake);

    /**
     * Depending on how the wind is the x value can be configured
     */
    switch (flake.direction) {
        case WindDirection.blowLeft:
            flake.location.x -= newPositionBasedOnWind;
            break;
        case WindDirection.blowRight:
            flake.location.x += newPositionBasedOnWind;
            break;
    }

    /**
     * Update the y position based on the gravity speed of the flake
     */
    flake.location.y += flake.weight * flake.wind;
};

const calculateWind = (flake: Flake): number => {
    /**
     * Build a random list of possible mathematical function calls
     */
    const mathematicalParts = [
        Math.cos(flake.wind),
        Math.sin(flake.wind),
        Math.tan(flake.wind),
        Math.pow(flake.weight, 2)
    ];

    /**
     * Sort the above list
     */
    mathematicalParts.sort(() => {
        return Math.random();
    });

    return mathematicalParts.reduce((a, b) => a + b, 0);
};