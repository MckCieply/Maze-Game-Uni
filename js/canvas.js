let canvas, ctx;

/**
 * Initializes the canvas and its drawing context.
 */
export function setupCanvas() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
}

export function getCanvas() {
    return canvas;
}

export function getContext() {
    return ctx;
}
