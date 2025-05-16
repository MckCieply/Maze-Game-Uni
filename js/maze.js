import {getContext} from "./canvas.js";
import {MAZE_TEMPLATE, TILE_HEIGHT, TILE_WIDTH} from "./config.js";

/**
 * Draw the maze grid on the canvas.
 */
export function drawMaze() {
    const ctx = getContext();

    MAZE_TEMPLATE.forEach((row, y) => {
        row.forEach((cell, x) => {
            ctx.fillStyle = cell === 1 ? '#333' : '#eee';
            ctx.fillRect(x * TILE_WIDTH, y * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
        });
    });
}