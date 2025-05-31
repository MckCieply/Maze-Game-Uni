import { getContext } from './canvas.js';
import { checkTile, drawMaze, getStartCoords, getTileIndexFromPixels } from './maze.js';
import { getCurrentMaze, setCurrentMaze, TILE_HEIGHT, TILE_WIDTH } from "./config.js";
import { MAZES } from "./config.js";
import { PlayerInput } from "./playerInput.js";

let state = "playing";
let { x: playerX, y: playerY } = getStartCoords(getCurrentMaze());
let keyProcessed = false;

const playerInput = new PlayerInput();

const mazeOrder = Object.keys(MAZES);
let currentMazeIndex = mazeOrder.indexOf(Object.keys(MAZES).find(key => MAZES[key] === getCurrentMaze()));
if (currentMazeIndex === -1) currentMazeIndex = 0;

function loop() {
    if (state !== "playing") return;

    handleInput();
    update();
    render();
    requestAnimationFrame(loop);
}

function handleInput() {
    if (!keyProcessed) {
        processMovement('ArrowUp', 0, -TILE_HEIGHT);
        processMovement('ArrowDown', 0, TILE_HEIGHT);
        processMovement('ArrowLeft', -TILE_WIDTH, 0);
        processMovement('ArrowRight', TILE_WIDTH, 0);
    }

    if (!playerInput.keys.size) {
        keyProcessed = false;
    }
}

function update() {
    updateUI();
}

function updateUI() {
    document.getElementById("success").className = state === "success" ? "success-visible" : "success-hidden";
    document.getElementById("failure").className = state === "failed" ? "failure-visible" : "failure-hidden";
}

function render() {
    const ctx = getContext();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawMaze(getCurrentMaze());

    ctx.fillStyle = "rgb(0, 100, 200)";
    ctx.fillRect(playerX, playerY, TILE_WIDTH, TILE_HEIGHT);
}

export function changeState(newState) {
    if (["playing", "success", "failed"].includes(newState)) {
        state = newState;
    } else {
        console.error("Invalid game state:", newState);
    }
}

function processMovement(key, dx, dy) {
    if (!playerInput.isKeyPressed(key)) return;

    const { row, col } = getTileIndexFromPixels(playerX + dx, playerY + dy);
    const tileType = checkTile(getCurrentMaze(), row, col);

    if (tileType === "win") {
        changeState("success");
        playerX += dx;
        playerY += dy;
    } else if (tileType === "wall") {
        changeState("failed");
    } else if (tileType === "empty") {
        playerX += dx;
        playerY += dy;
        keyProcessed = true;
    }
}

export function restartGame() {
    changeState("playing");
    ({ x: playerX, y: playerY } = getStartCoords(getCurrentMaze()));
    keyProcessed = false;
    update();
    render();
    startLoop();
}

export function startLoop() {
    requestAnimationFrame(loop);
}

export function nextLevel() {
    if (currentMazeIndex + 1 >= mazeOrder.length) {
        alert("Gratulacje! To był ostatni poziom.");
        return;
    }

    currentMazeIndex++;
    const nextMazeKey = mazeOrder[currentMazeIndex];
    setCurrentMaze(nextMazeKey);

    changeState("playing");
    ({ x: playerX, y: playerY } = getStartCoords(getCurrentMaze()));
    keyProcessed = false;
    update();
    render();
    startLoop();
}
