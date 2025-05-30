import { getContext } from './canvas.js';
import {checkTile, drawMaze, getStartCoords, getTileIndexFromPixels} from './maze.js';
import {MAZE_TEMPLATE, TILE_HEIGHT, TILE_WIDTH} from "./config.js";
import { PlayerInput } from "./playerInput.js";

// Game state management
// Either "playing", "success", or "failed"
let state = "playing";
let { x: playerX, y: playerY } = getStartCoords(MAZE_TEMPLATE);
let keyProcessed = false;

const playerInput = new PlayerInput();

function loop() {
    if(state !== "playing") return;

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

// === Update UI Based on State ===
function updateUI() {
    if (state === "success") {
        document.getElementById("success").className = "success-visible";
    } else if (state === "failed") {
        document.getElementById("failure").className = "failure-visible";
    } else {
        document.getElementById("success").className = "success-hidden";
        document.getElementById("failure").className = "failure-hidden";
    }
}

function render() {
    const ctx = getContext();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawMaze();

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

    const tileType = checkTile(MAZE_TEMPLATE, row, col);

    if (tileType === "win") {
        changeState("success");
        playerX += dx;              // Move player to win tile
        playerY += dy;
    }
    else if (tileType === "wall")
        changeState("failed");

    else if (tileType === "empty"){
        playerX += dx;
        playerY += dy;
        keyProcessed = true;
    }
}


export function startLoop() {
    requestAnimationFrame(loop);
}
