import { Flake } from "./flake";

/**
 * How to configure the blizzard render
 */
export interface BlizzardConfiguration {
    /**
     * How many flakes should be shown on the page at one time
     */
    flakeCount?: number;
    /**
     * What is the size of the flake?
    */
    maxFlakeSize?: number;
    /**
     * What is the virtual wind speed of the application
     */
    windSpeed?: number;
    /**
     * How long should the flake stick to the bottom of the screen,
     * if null it will never happen
     */
    stickyCount?: number; 
}

/**
 * What direction can the wind blow
 */
export enum WindDirection {
    right,
    left
}

/**
 * A vector representing a coordinate on a 2d plane
 */
export interface Vector2d {
    x: number;
    y: number;
}

/**
 * What the context of the current blizzard state looks like
 */
export interface BlizzardState {
    /**
     * The context of the canvas being used to render the blizzard
     */
    context: CanvasRenderingContext2D;
    
    /**
     * The height of the canvas being used
     */
    height: number;

    /**
     * The width of the canvas being used
     */
    width: number;

    /**
     * The container holding all the flakes being displayed on the canvas
     */
    flakes: Array<Flake>;

    /**
     * How fast should the wind be based on the configuration the user has passed in and the default
     */
    windSpeed: number;

    /**
     * How long should the flake stick to the bottom of the screen,
     * if null it will never happen
     */
    stickyCount: number;
}