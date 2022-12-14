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


export interface Flake {
    x: number;
    y: number;
    wind: number;
    gravity: number;
    size: number;
}