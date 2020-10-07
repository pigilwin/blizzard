import {Helpers} from './helpers';

export class Flake {
    
    private readonly maxWeight: number = 5;
    private readonly maxSpeed: number = 3;
    private readonly step: number = 0.01;

    private _x: number;
    private _y: number;
    private radius: number;
    private area: number;
    private weight: number;
    private speed: number;

    /**
     * Create a new flake
     * @param x
     * @param y 
     */
    public constructor(x: number, y: number){
        this._x = x;
        this._y = y;
        this.radius = Helpers.random(0, 1, false);
        this.area = Helpers.random(0, Math.PI, false);
        this.weight = Helpers.random(2, this.maxWeight, false);
        this.speed = (this.weight / this.maxWeight) * this.maxSpeed;
    }

    public update(): void {
        this._x += Math.cos(this.area) * this.radius;
        this.area += this.step;
        this._y += this.speed;
    }

    public removeWeightFromY(): void {
        this._y = -this.weight;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }
}