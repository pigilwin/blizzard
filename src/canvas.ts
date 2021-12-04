export class Canvas {

    private readonly canvasId: string = 'blizzard-canvas';

    private canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;
    
    /**
     * Build a new canvas
     * @param {number} height 
     * @param {number} width 
     */
    public constructor(height: number, width: number) {
        this._height = height;
        this._width = width;

        /**
         * If the element is already detected then lets fail
         */
        if (document.querySelector("#" + this.canvasId) !== null) {
            throw new Error('A blizzard canvas element has already been found');
        }

        this.canvas = document.createElement('canvas');
        this.canvas.id = this.canvasId;
        this._context = <CanvasRenderingContext2D> this.canvas.getContext('2d');
        this.style();
        document.body.appendChild(this.canvas);
    }

    /**
     * Fetch the context of the canvas
     * @returns {CanvasRenderingContext2D}
     */
    public get context(): CanvasRenderingContext2D {
        return this._context;
    }

    public get height(): number {
        return this._height;
    }

    public set height(n: number) {
        this._height = n;
        this.style();
    }

    public get width(): number {
        return this._width;
    }

    public set width(n: number) {
       this._width = n;
       this.style();
    }

    /**
     * Set the style
     */
    private style(): void {
        this.canvas.height = this._height;
        this.canvas.width = this._width;
        this.canvas.style.margin = '0';
        this.canvas.style.padding = '0';
        this.canvas.style.position = 'fixed';
        this.canvas.style.touchAction = 'none';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
    }
}