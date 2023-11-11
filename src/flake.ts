import {getSecondsSinceEpoch, random} from './helpers';
import {Vector2d, WindDirection} from './types';

export class Flake {
    public location: Vector2d;
    public windSpeed: number;
    public width: number;
    public size: number;
    public weight: number;
    public direction: WindDirection = WindDirection.right;
    
    private lockedTime?: number = null;

    public static readonly maxWeight: number = 5;

    public constructor(
        location: Vector2d, 
        windSpeed: number, 
        size: number,
        direction: WindDirection
    ) {
        this.windSpeed = windSpeed;
        this.size = size;
        this.location = location;
        this.direction = direction;
        this.weight = random(3, Flake.maxWeight, false) / Flake.maxWeight;
    }

    public update(
        width: number,
        height: number,
        howLongToBeStickyFor?: number 
    ): void {
        
        /**
         * If this flake is currently locked and the locked time
         * has exceeded the application default then unlock the flake and reset the top location 
         */
        if (this.isLocked(howLongToBeStickyFor) && this.hasExcededStickTime(howLongToBeStickyFor)) {
            this.unlock();
            this.resetTopLocation(width);
            return;
        }

        /**
         * If the flake has gone off the canvas and we want to stick the snow
         * to the bottom then lock the flake in place
         */
        if (this.hasExcededCanvasHeight(height) && !this.isLocked(howLongToBeStickyFor)) {
            this.lock();
            return;
        }

        /**
         * If the flake is locked but we haven't excluded the sticky
         * time then we need to exit as nothing else can be done
         * at the moment
         */
        if (this.isLocked(howLongToBeStickyFor)) {
            return;
        }

        /**
         * If the flake has gone off the canvas
         * then reset it back to the top
         */
        if (this.hasExcededCanvasHeight(height)) {
            this.resetTopLocation(width);
            return;
        }
        
        if (this.location.x <= 0) {
            this.direction = WindDirection.right;
        }

        if (this.location.x >= width) {
            this.direction = WindDirection.left;
        }

        /**
         * Depending on how the wind is the x value can be configured
         */
        switch (this.direction) {
            case WindDirection.left:
                this.location.x -= this.calculateWind();
                break;
            case WindDirection.right:
                this.location.x += this.calculateWind();
                break;
        }

        /**
         * Update the y position based on the gravity speed of the flake
         */
        this.location.y += this.weight * this.windSpeed;
    }

    /**
     * Has the location of the flake exceded the canvas height
     * @param {number} canvasHeight 
     * @returns {boolean}
     */
    private hasExcededCanvasHeight(canvasHeight: number): boolean
    {
        return this.location.y >= canvasHeight;
    }

    /**
     * Is the flake locked?
     * @param {number|null} howLongToBeStickyFor
     * @returns {boolean}
     */
    private isLocked(howLongToBeStickyFor?: number): boolean
    {
        return this.lockedTime !== null && howLongToBeStickyFor !== null;
    }

    /**
     * Has the sticky time exceed
     * @param {number} howLongToBeStickyFor 
     * @returns {boolean} 
     */
    private hasExcededStickTime(howLongToBeStickyFor: number): boolean
    {
        const now = getSecondsSinceEpoch();
        return (this.lockedTime + howLongToBeStickyFor) < now;
    }

    /**
     * Unlock the flake
     */
    private unlock(): void
    {
        this.lockedTime = null;
    }

    /**
     * Lock the flake
     */
    private lock(): void
    {
        this.lockedTime = getSecondsSinceEpoch();
    }

    /**
     * Reset the top location to a random x cooridnate on the canvas
     * and a Y of 0
     * 
     * @param {number} width 
     */
    private resetTopLocation(width: number): void
    {
        this.location = {
            x: random(0, width, true),
            y: 0
        };
    }

    /**
     * Calculate the wind based on the flake properties
     * @returns {number}
     */
    private calculateWind(): number
    {
        /**
         * Build a random list of possible mathematical function calls
         */
        const mathematicalParts = [
            Math.cos(this.windSpeed),
            Math.sin(this.windSpeed),
            Math.tan(this.windSpeed),
            Math.pow(this.weight, 2)
        ];
    
        /**
         * Sort the above list
         */
        mathematicalParts.sort(() => {
            return Math.random();
        });
    
        return mathematicalParts.reduce((a, b) => a + b, 0);
    };
}

export const initialiseFlake = (
    canvasWidth: number,
    windSpeed: number,
    size: number
): Flake => {
    const location = {
        x: random(0, canvasWidth, true),
        y: 0
    };

    let wind = WindDirection.right;
    if (location.x > (canvasWidth / 2)) {
        wind = WindDirection.left;
    }

    return new Flake(
        location,
        windSpeed,
        size,
        wind
    );
};
