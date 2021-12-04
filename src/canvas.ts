const canvasId = 'blizzard-canvas';

const getCanvas = (): HTMLCanvasElement => {
    return document.querySelector(`#${canvasId}`) as HTMLCanvasElement;
};

export const appendCanvasToDocument = (width: number, height: number): void => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.id = canvasId;

    canvas.style.margin = '0';
    canvas.style.padding = '0';
    canvas.style.position = 'fixed';
    canvas.style.touchAction = 'none';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';

    document.body.appendChild(canvas);
};

export const doesCanvasExistOnDocument = (): boolean => {
    return document.querySelector(`#${canvasId}`) !== null;
};

export const getConext = (): CanvasRenderingContext2D => {
    const canvas = getCanvas();
    return <CanvasRenderingContext2D> canvas.getContext('2d');
};