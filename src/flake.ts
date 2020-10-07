import {Helpers} from './helpers';

export class Flake {
    
    private readonly maxWeight: number = 5;
    private readonly maxSpeed: number = 3;
    private readonly step: number = 0.01;

    private x: number;
    private y: number;
    private radius: number;
    private area: number;
    private weight: number;
    private alpha: number;
    private speed: number;

    public constructor(x: number, y: number){
        this.x = x;
        this.y = y;
        this.radius = Helpers.random(0, 1, false);
        this.area = Helpers.random(0, Math.PI, false);
        this.weight = Helpers.random(2, this.maxWeight, false);
        this.alpha = (this.weight / this.maxWeight);
        this.speed = (this.weight / this.maxWeight) * this.maxSpeed;
    }

    public update(): void {
        this.x += Math.cos(this.area) * this.radius;
        this.area += this.step;
        this.y += this.speed;
    }

    public removeWeightFromY(): void {
        this.y = -this.weight;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getAlpha(): number {
        return this.alpha;
    }

    public getWeight(): number {
        return this.weight;
    }
}