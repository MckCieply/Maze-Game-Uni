import { getContext } from './canvas.js';
import { drawMaze } from './maze.js';

// Game state management
// Either "playing", "success", or "failed"
let state = "playing";

let colorValue = 0;
/**
 * Restart game functionality
 * FOR NOW CHANGES PIXEL COLOR EVERY 2 SECONDS
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function changeColorLoop() {
    for (;;) {
        colorValue = (colorValue + 80) % 256;
        await sleep(2000);
    }
}

function loop() {
    checkState();
    const ctx = getContext();

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawMaze();

    ctx.fillStyle = `rgb(${colorValue}, 100, 200)`;
    ctx.fillRect(10, 10, 10, 10);

    requestAnimationFrame(loop);
}

function checkState(){
    if (state === "success"){
        document.getElementById("success").className = "success-visible";

    }
    if (state === "playing"){
        document.getElementById("success").className = "success-hidden";

    }
}

// Call either when player exits the maze or when collision is detected
function changeState(newState) {
    if (newState === "playing" || newState === "success" || newState === "failed") {
        state = newState;
    } else {
        console.error("Invalid game state:", newState);
    }
}

export function startLoop() {
    changeColorLoop();
    requestAnimationFrame(loop);
}
