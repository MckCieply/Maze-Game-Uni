import { setupCanvas } from './canvas.js';
import { startLoop, restartGame, nextLevel } from "./gameLoop.js";
import { getCurrentMaze } from "./config.js";
import { drawMaze, getStartCoords } from "./maze.js";

setupCanvas();
startLoop();

window.restartGame = restartGame;
window.nextLevel = nextLevel;

