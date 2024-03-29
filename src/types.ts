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
}

/**
 * What direction can the wind blow
 */
export enum WindDirection {
    blowLeft,
    blowRight
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
     * What is 10 percent of the current width
     */
    tenPercentOfWidth: number;

    /**
     * How fast should the wind be based on the configuration the user has passed in and the default
     */
    windSpeed: number;
}

/**
 * How a flake is defined
 */
export interface Flake {
    /**
     * A vector representing a coordinate on a 2d plane
     */
    location: Vector2d;
    /**
     * The current wind affecting the flake speed
     */
    wind: number;
    /**
     * How fast should the flake fall relevant to the wind
     */
    weight: number;
    /**
     * How big is the flake on the canvas
     */
    size: number;

    /**
     * What direction should the wind move
     */
    direction: WindDirection;
}