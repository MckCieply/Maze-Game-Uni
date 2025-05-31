import {getContext} from "./canvas.js";
import {getCurrentMaze, TILE_HEIGHT, TILE_WIDTH} from "./config.js";

/**
 * Draws the maze grid on the canvas based on the `MAZE_TEMPLATE`.
 * Walls are drawn in dark gray (#333), and paths are drawn in light gray (#eee).
 */

export function drawMaze(template) {
    const ctx = getContext();

    template.forEach((row, y) => {
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

/**
 * Retrieves the tile coordinates (row and column) based on the given X and Y pixel coordinates.
 *
 * @param {number} x - The X-coordinate in pixels.
 * @param {number} y - The Y-coordinate in pixels.
 * @returns {{row: number, col: number}} - The row and column indices of the tile.
 */
export function getTileIndexFromPixels(x, y) {
    return {
        row: Math.floor(y / TILE_HEIGHT),
        col: Math.floor(x / TILE_WIDTH)
    };
}

/**
 * Checks the type of tile in the maze based on its row and column indices.
 *
 * @param {number[][]} maze - The maze grid represented as a 2D array.
 * @param {number} row - The row index of the tile.
 * @param {number} col - The column index of the tile.
 * @returns {string} - The type of the tile: "wall", "win", "empty", or "unknown".
 */
export function checkTile(maze, row, col) {
    const value = maze[row]?.[col];

    if (value === 1)
        return "wall";
     else if (value === 3)
        return "win";
     else if (value === 0 || value === 2)
        return "empty";


    return "unknown";
}