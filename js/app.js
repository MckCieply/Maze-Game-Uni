// main.js
import { setupCanvas } from './canvas.js';
import {startLoop, restartGame} from "./gameLoop.js";

setupCanvas();
startLoop();
window.restartGame = restartGame;

