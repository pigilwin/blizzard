import {Helpers} from './helpers';

export class Flake {
    
    private readonly maxWeight: number = 5;
    private readonly maxGravity: number = 3;
    private readonly step: number = 0.01;

    private _x: number;
    private _y: number;
    private wind: number;
    private weight: number;
    private gravity: number;

    /**
     * Create a new flake
     * @param x
     * @param y 
     */
    public constructor(x: number, y: number){
        this._x = x;
        this._y = y;
        this.wind = Helpers.random(0, Math.PI, false);
        this.weight = Helpers.random(2, this.maxWeight, false);
        this.gravity = (this.weight / this.maxWeight) * this.maxGravity;
    }

    public update(): void {
        this._x += Math.cos(this.wind) + Math.sin(this.wind);//Calculate the next random position
        this.wind += this.step;
        this._y += this.gravity;
    }
    
    public resetFlakeToTop(): void {
        this._y = 0;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }
}