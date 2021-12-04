import {random} from './helpers';

const maxWeight = 5;
const maxGravity = 3;
const step = 0.01;

export interface Flake {
    x: number;
    y: number;
    wind: number;
    gravity: number;
}

export const initialiseFlake = (x: number, y: number): Flake => {
    return {
        x,
        y,
        wind: random(0, Math.PI, false),
        gravity: (random(1, maxWeight, false) / maxWeight) * maxGravity
    };
};

export const updateFlakePostition = (flake: Flake, windSpeed: number): void => {
    /**
     * Calculate the next random position of the X value;
     */
    flake.x += (Math.cos(flake.wind) + Math.sin(flake.wind)) * windSpeed;

    /**
     * Calculate the next random position of the Y value;
     */
    flake.y += flake.gravity;

    /**
     * Update the wind value;
     */
    flake.wind += step;
};

export const resetFlakeXPosition = (flake: Flake, x: number): void => {
    flake.x = x;
};

export const resetFlakeYPosition = (flake: Flake): void => {
    flake.y = 0;
};