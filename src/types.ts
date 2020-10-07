export interface BlizzardConfigurationItem {
    /**
     * How many flakes should be shown on the page at one time
     */
    flakeCount?: number;

    /**
     * What is the virtual wind speed of the application
     */
    windSpeed?: number;

    /**
     * What character should be shown when displaying the flake
     */
    flakeCharacter?: string;

    /**
     * Should the snow flakes react to the mouse
     */
    avoidMouse?: boolean;
}