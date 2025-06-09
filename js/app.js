import {setupCanvas} from './canvas.js';
import {nextLevel, restartGame, startLoop} from "./gameLoop.js";

setupCanvas();
startLoop();

window.restartGame = restartGame;
window.nextLevel = nextLevel;

