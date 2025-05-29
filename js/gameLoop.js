import { getContext } from './canvas.js';
import { drawMaze } from './maze.js';

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
    const ctx = getContext();

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawMaze();

    ctx.fillStyle = `rgb(${colorValue}, 100, 200)`;
    ctx.fillRect(10, 10, 10, 10);

    requestAnimationFrame(loop);
}

export function startLoop() {
    changeColorLoop();
    requestAnimationFrame(loop);
}
