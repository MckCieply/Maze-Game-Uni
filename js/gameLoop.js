import { getContext } from './canvas.js';
import { checkTile, drawMaze, getStartCoords, getTileIndexFromPixels } from './maze.js';
import { getCurrentMaze, setCurrentMaze, TILE_HEIGHT, TILE_WIDTH } from "./config.js";
import { regenerateMaze} from "./config.js";
import { PlayerInput } from "./playerInput.js";
import { createPlayerMovementController } from "./playerMovement.js";

let state = "playing";
const playerInput = new PlayerInput();
const movementController = createPlayerMovementController(changeState);
let keyProcessed = false;

let maze;

function loop() {
   /* if (state !== "playing") return;*/
    if (state !== "playing" && !movementController.isPlayerMoving()) return;

    handleInput();
    update();
    render();
    requestAnimationFrame(loop);
}

function handleInput() {
    if (!keyProcessed && !movementController.isPlayerMoving()) {
        if (playerInput.isKeyPressed('ArrowUp')) {
            if (movementController.tryMove(0, -TILE_HEIGHT)) keyProcessed = true;
        }
        if (playerInput.isKeyPressed('ArrowDown')) {
            if (movementController.tryMove(0, TILE_HEIGHT)) keyProcessed = true;
        }
        if (playerInput.isKeyPressed('ArrowLeft')) {
            if (movementController.tryMove(-TILE_WIDTH, 0)) keyProcessed = true;
        }
        if (playerInput.isKeyPressed('ArrowRight')) {
            if (movementController.tryMove(TILE_WIDTH, 0)) keyProcessed = true;
        }
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

    const { x, y } = movementController.getRenderPosition();

    ctx.fillStyle = "rgb(0, 100, 200)";
    ctx.fillRect(x, y, TILE_WIDTH, TILE_HEIGHT);
}

export function changeState(newState) {
    if (["playing", "success", "failed"].includes(newState)) {
        state = newState;
    } else {
        console.error("Invalid game state:", newState);
    }
}

export function restartGame() {
    maze = getCurrentMaze();
    changeState("playing");
    const startCoords = getStartCoords(getCurrentMaze());
    movementController.init(startCoords);
    keyProcessed = false;
    update();
    render();
    startLoop();
}

export function nextLevel() {
    regenerateMaze();
    changeState("playing");
    const startCoords = getStartCoords(getCurrentMaze());
    movementController.init(startCoords);
    keyProcessed = false;
    update();
    render();
    startLoop();
}

export function startLoop() {
    maze = getCurrentMaze();
    changeState("playing");
    const startCoords = getStartCoords(maze);
    movementController.init(startCoords);
    keyProcessed = false;
    update();
    render();
    requestAnimationFrame(loop);
}
