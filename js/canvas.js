import {CANVAS_HEIGHT, CANVAS_WIDTH} from "./config.js";

let canvas, ctx;

/**
 * Initializes the canvas and 2D context.
 * Adjusts for high-DPI (retina) displays for sharper rendering.
 */
export function setupCanvas() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // It fits more pixels, due to scale, into desired 500x500px so its better res
    const scale = window.devicePixelRatio || 1;
    canvas.width = CANVAS_WIDTH * scale;
    canvas.height = CANVAS_HEIGHT * scale;
    canvas.style.width = CANVAS_WIDTH + 'px';
    canvas.style.height = CANVAS_HEIGHT + 'px';
    ctx.scale(scale, scale);
}

export function getContext() {
    return ctx;
}

