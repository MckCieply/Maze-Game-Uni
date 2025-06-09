export const CANVAS_WIDTH = 500;
export const CANVAS_HEIGHT = 500;

export const RENDER_DISTANCE = 5;

export const MAZE_ROWS = 21;
export const MAZE_COLUMNS = 21;
/**
 * 0 = path, 1 = wall., 2 = start, 3 = end
 */

let currentMazeKey;

function createEmptyMaze(rows, cols) {
    const maze = Array.from({ length: rows }, (_, y) =>
        Array.from({ length: cols }, (_, x) => (x % 2 === 1 && y % 2 === 1 ? 0 : 1))
    );
    return maze;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateMaze(rows, cols) {
    const maze = createEmptyMaze(rows, cols);
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    function dfs(x, y) {
        visited[y][x] = true;

        const directions = [
            [0, -2], // up
            [2, 0],  // right
            [0, 2],  // down
            [-2, 0]  // left
        ];
        shuffle(directions);

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (ny > 0 && ny < rows && nx > 0 && nx < cols && !visited[ny][nx]) {
                maze[y + dy / 2][x + dx / 2] = 0;
                dfs(nx, ny);
            }
        }
    }

    const startX = 1;
    const startY = 1;
    dfs(startX, startY);
    maze[startY][startX] = 2;

    const edgeExits = [];

    for (let x = 1; x < cols - 1; x++) {
        if (maze[1][x] === 0) edgeExits.push({ x, y: 0 });
        if (maze[rows - 2][x] === 0) edgeExits.push({ x, y: rows - 1 });
    }

    for (let y = 1; y < rows - 1; y++) {
        if (maze[y][1] === 0) edgeExits.push({ x: 0, y });
        if (maze[y][cols - 2] === 0) edgeExits.push({ x: cols - 1, y });
    }

    shuffle(edgeExits);
    const exit = edgeExits[0];

    if (exit) {
        maze[exit.y][exit.x] = 3;
    } else {
        /* if exit wasn't generated */
        return generateMaze(rows, cols);
    }

    return maze;
}


let currentMaze = generateMaze(MAZE_ROWS, MAZE_COLUMNS);


export function getCurrentMaze() {
    return currentMaze;
}
export function regenerateMaze() {
    currentMaze = generateMaze(MAZE_ROWS, MAZE_COLUMNS);
}
export function setCurrentMaze(mazeName) {
    if (MAZES[mazeName]) {
        currentMazeKey = mazeName;
    } else {
        console.error(`Maze ${mazeName} does not exist.`);
    }
}

export const TILE_HEIGHT = CANVAS_HEIGHT / MAZE_ROWS
;
export const TILE_WIDTH = CANVAS_WIDTH / MAZE_COLUMNS;
