import {random} from './helpers';
import {BlizzardState, Flake, WindDirection} from './types';

const maxWeight = 5;
const maxGravity = 3;

export const initialiseFlake = (
    width: number,
    maxFlakeSize: number,
    windSpeed: number
): Flake => {
    const halfOfWidth = width / 2;
    const startingPosition = random(0, width, true);

    return {
        x: startingPosition,
        y: 0,
        wind: windSpeed,
        gravity: (random(1, maxWeight, false) / maxWeight) * maxGravity,
        size: random(1, maxFlakeSize, false),
        direction: WindDirection.neutral,
        startedHalfwayAcross: startingPosition >= halfOfWidth,
    };
};

export const updateFlakePosition = (flake: Flake, state: BlizzardState): void => {

    /**
     * If the flake y position is greater than the height of the canvas then
     * reset the flake to the top of the canvas
     */
    if (flake.y >= state.height) {
        flake.y = 0;
    }

    /**
     * Default the wind direction to be neutral
     */
    flake.direction = WindDirection.neutral;

    /**
     * If the flake goes off the screen to the right then
     * instruct the wind to force the flake back to the left
     */
    if (flake.x >= state.width) {
        flake.direction = WindDirection.left;
    }

    /**
     * If the flake goes off the screen to the left then
     * instruct the wind to force the flake back to the right
     */
    if (flake.x <= 0) {
        flake.direction = WindDirection.right;
    }

    const newPositionBasedOnWind = calculateWind(flake);

    /**
     * Depending on how the wind is the x value can be configured
     */
    switch (flake.direction) {
        case WindDirection.left:
            flake.x -= newPositionBasedOnWind * 10;
            break;
        case WindDirection.right:
            flake.x += newPositionBasedOnWind * 10;
            break;
        case WindDirection.neutral:
            if (flake.startedHalfwayAcross) {
                flake.x -= newPositionBasedOnWind;
            } else {
                flake.x += newPositionBasedOnWind;
            }
            break;
    }

    /**
     * Update the y position based on the gravity speed of the flake
     */
    flake.y += flake.gravity * flake.wind;
};

const calculateWind = (flake: Flake): number => {
    /**
     * Build a random list of possible mathematical function calls
     */
    const mathematicalParts = [
        Math.cos(flake.wind),
        Math.sin(flake.wind),
        Math.tan(flake.wind),
        Math.pow(flake.gravity, 2)
    ];

    /**
     * Sort the above list
     */
    mathematicalParts.sort(() => {
        return Math.random();
    });

    return mathematicalParts.reduce((a, b) => a + b, 0);
};