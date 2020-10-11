import { Flake } from "./flake";

enum Direction {LEFT, RIGHT}

export class Wind {
    private readonly spacer = 50;

    private direction: Direction = Direction.LEFT;
    private mouseMovementX = 0;

    /**
     * Apply a mouse event to the wind instance
     * @param {MouseEvent} e
     * @returns {void} 
     */
    public apply(e: MouseEvent): void {
        if (e.pageX < this.mouseMovementX) {
            this.direction = Direction.LEFT;
        } else if (e.pageX > this.mouseMovementX) {
            this.direction = Direction.RIGHT;
        }
        this.mouseMovementX = e.pageX;
    }

    public updateFlake(flake: Flake): void {
        let x = Math.round(flake.x);
        
        if (this.direction === Direction.LEFT) {
            x += 1;
        }

        if (this.direction === Direction.RIGHT) {
            x-= 1;
        }
 
        flake.x = x;
    }
}