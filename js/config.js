export const CANVAS_WIDTH = 500;
export const CANVAS_HEIGHT = 500;

export const MAZE_ROWS = 10;
export const MAZE_COLUMNS = 10;
/**
 * 0 = path, 1 = wall., 2 = start, 3 = end
 */
export const MAZE_TEMPLATE = [
    [1,1,1,1,1,1,1,1,1,1],
    [3,0,0,0,1,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,0,1],
    [1,0,1,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,0,1,0,1],
    [1,0,0,0,0,1,0,1,0,1],
    [1,0,1,1,0,1,0,1,0,1],
    [1,0,0,1,0,0,0,1,0,1],
    [1,1,0,0,0,1,0,0,0,1],
    [1,1,1,1,1,1,1,1,2,1],
];

export const TILE_HEIGHT = CANVAS_HEIGHT / MAZE_ROWS
;
export const TILE_WIDTH = CANVAS_WIDTH / MAZE_COLUMNS;
