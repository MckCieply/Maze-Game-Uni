import {getContext} from "./canvas";
import {MAZE_TEMPLATE, TILE_SIZE} from "./config";

/**
 * Draw the maze grid on the canvas.
 */
export function drawMaze() {
    const ctx = getContext();

    MAZE_TEMPLATE.forEach((row, y) => {
        row.forEach((cell, x) => {
            ctx.fillStyle = cell === 1 ? '#333' : '#eee';
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        });
    });
}