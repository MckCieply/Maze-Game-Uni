import {getContext} from "./canvas.js";
import {RENDER_DISTANCE, TILE_HEIGHT, TILE_WIDTH} from "./config.js";

/**
 * Draws the maze grid on the canvas.
 * A "fog of war" effect is created where only tiles near the player are visible.
 * Visibility decreases in regular, square-shaped bands around the player.
 */
export function drawMaze(template, playerTileCoords) {
    const ctx = getContext();

    ctx.fillStyle = '#393939';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    template.forEach((row, y) => {
        row.forEach((cell, x) => {
            // Use Chebyshev distance to create a square-shaped field of view
            const distance = Math.max(Math.abs(playerTileCoords.col - x), Math.abs(playerTileCoords.row - y));

            if (distance <= RENDER_DISTANCE) {

                // Visibility decreases in steps based on the distance.
                let visibility = 1.0;
                if (distance > 2) {
                    visibility = 1.0 - ((distance - 2) / (RENDER_DISTANCE - 2));
                }

                ctx.globalAlpha = Math.max(0, visibility);
                ctx.fillStyle = cell === 1 ? '#333' : '#eee';

                // Calculate precise, rounded pixel values for each tile to ensure no gaps or overlaps.
                const drawX = Math.round(x * TILE_WIDTH);
                const drawY = Math.round(y * TILE_HEIGHT);
                const drawWidth = Math.round((x + 1) * TILE_WIDTH) - drawX;
                const drawHeight = Math.round((y + 1) * TILE_HEIGHT) - drawY;

                ctx.fillRect(drawX, drawY, drawWidth, drawHeight);
            }
        });
    });

    // Reset globalAlpha to 1.0 so it doesn't affect other drawing operations
    ctx.globalAlpha = 1.0;
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
 * The starting tile is identified by the value `2` in the `MAZES`.
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
        row: Math.round(y / TILE_HEIGHT),
        col: Math.round(x / TILE_WIDTH)
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