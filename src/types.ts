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
}

/**
 * How a flake is defined
 */
export interface Flake {
    /**
     * The location within the canvas on the horizontal plane
     */
    x: number;
    /**
     * The location within the canvas on the vertical plane
     */
    y: number;
    /**
     * The current wind affecting the flake speed
     */
    wind: number;
    /**
     * How fast should the flake fall relevant to the wind
     */
    gravity: number;
    /**
     * How big is the flake on the canvas
     */
    size: number;
}