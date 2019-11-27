class Blizzard {

    private flakeCount: number = 1000;
    private flakes: Array<Flake> = [];
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private windowWidth: number = 0;
    private windowHeight: number = 0;
    private loaded: boolean = false;
    private mouseX: number = -100;
    private mouseY: number = -100;

    public constructor() {
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
        this.canvas = document.createElement('canvas');
        this.context = <CanvasRenderingContext2D> this.canvas.getContext('2d');
        this.setCanvasStyle();
        document.body.appendChild(this.canvas);

        if (!this.loaded) {
            this.load();
            this.addMouseListener();
        }
    } 

    /**
     * Start the canvas
     * @returns {void}
     */
    public start(): void {
        this.scaleCanvas();
        this.loop();
    }

    /**
     * Load the flakes into the instance
     * @returns {void}
     */
    private load(): void {
        if (this.loaded) {
            return;
        }

        let i: number = this.flakeCount;

        while(i--) {
            let x: number = Helpers.random(0, this.windowWidth, true);
            let y: number = Helpers.random(0, this.windowHeight, true);
            this.flakes.push(new Flake(x, y));
        }

        this.loaded = true;
    }

    private addMouseListener(): void {
        const that: Blizzard = this;
        this.canvas.addEventListener("mousemove", (e: MouseEvent) => {
            that.mouseX = e.clientX,
            that.mouseY = e.clientY
        });
    }

    /**
     * Scale the canvas to the screen
     * @returns {void}
     */
    public scaleCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * Loop each annimation frame
     * @returns {void}
     */
    private loop(): void {

        let i: number = this.flakes.length;

        this.context.save();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.context.restore();

        while(i--) {
            const flake: Flake = this.flakes[i];
            flake.update();

            let y: number = flake.getY();
            let x: number = flake.getX();
            
            this.context.beginPath();
            this.context.arc(
                x,
                y,
                flake.getWeight(),
                0,
                2 * Math.PI,
                false
            );
            this.context.fillStyle = 'rgba(255, 255, 255, ' + flake.getAlpha() + ')';
            this.context.fill();

            if (y >= window.innerHeight) {
                flake.removeWeightFromY();
            }
        }

        requestAnimationFrame(() => {
            this.loop();
        });
    }

    private setCanvasStyle(): void {
        this.canvas.height = this.windowHeight;
        this.canvas.width = this.windowWidth;
        this.canvas.style.margin = '0';
        this.canvas.style.padding = '0';
        this.canvas.style.position = 'fixed';
        this.canvas.style.touchAction = 'none';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
    }

}

class Flake {
    
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

class Helpers {

    static random(min: number, max: number, round: boolean): number {
        let generatedNumber: number = Math.random() * (max - min + 1) + 1;
        if (round) {
            return Math.floor(generatedNumber);
        }
        return generatedNumber; 
    }

}

document.addEventListener('DOMContentLoaded', () => {

    const blizzard: Blizzard = new Blizzard();
    blizzard.start();

    window.addEventListener('resize', () => {
        blizzard.scaleCanvas();
    });
});