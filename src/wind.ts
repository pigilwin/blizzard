enum Direction {LEFT, RIGHT}

export class Wind {
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
}