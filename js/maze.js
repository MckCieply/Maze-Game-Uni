import {getContext} from "./canvas.js";
import {MAZE_TEMPLATE, TILE_HEIGHT, TILE_WIDTH} from "./config.js";

/**
 * Draws the maze grid on the canvas based on the `MAZE_TEMPLATE`.
 * Walls are drawn in dark gray (#333), and paths are drawn in light gray (#eee).
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

/**
 * Finds the coordinates of the first tile in the maze that matches the given value.
 *
 * @param {number[][]} maze - The maze grid represented as a 2D array.
 * @param {number} value - The value to search for in the maze (e.g., 2 for start, 3 for end).
 * @returns {{row: number, col: number} | null} - The row and column of the matching tile, or null if not found.
 */
export function findTile(maze, value) {
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === value) {
                return { row, col };
            }
        }
    }
    return null;
}

/**
 * Retrieves the starting coordinates of the player based on the maze configuration.
 * The starting tile is identified by the value `2` in the `MAZE_TEMPLATE`.
 *
 * @param {number[][]} maze - The maze grid represented as a 2D array.
 * @returns {{x: number, y: number}} - The starting X and Y coordinates in pixels.
 */
export function getStartCoords(maze) {
    const start = findTile(maze, 2);
    if (start) {
        return {
            x: start.col * TILE_WIDTH,
            y: start.row * TILE_HEIGHT
        };
    }
    console.warn('Start tile not found in the maze.');
}