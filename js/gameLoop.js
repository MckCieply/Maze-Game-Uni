import { getContext } from './canvas.js';
import { drawMaze } from './maze.js';
import { TILE_HEIGHT, TILE_WIDTH } from "./config.js";
import { PlayerInput } from "./playerInput.js";

// Game state management
// Either "playing", "success", or "failed"
let state = "playing";
let playerX = 400;
let playerY = 450;
let keyProcessed = false;

const playerInput = new PlayerInput();

function loop() {
    handleInput();
    update();
    render();
    requestAnimationFrame(loop);
}

function handleInput() {
    if (!keyProcessed) {
        if (playerInput.isKeyPressed('ArrowUp')) {
            playerY -= TILE_HEIGHT;
            keyProcessed = true;
        }
        if (playerInput.isKeyPressed('ArrowDown')) {
            playerY += TILE_HEIGHT;
            keyProcessed = true;
        }
        if (playerInput.isKeyPressed('ArrowLeft')) {
            playerX -= TILE_WIDTH;
            keyProcessed = true;
        }
        if (playerInput.isKeyPressed('ArrowRight')) {
            playerX += TILE_WIDTH;
            keyProcessed = true;
        }
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

export function startLoop() {
    requestAnimationFrame(loop);
}
