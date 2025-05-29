// main.js
import { setupCanvas } from './canvas.js';
import { drawMaze } from "./maze.js";
import {startLoop} from "./gameLoop.js";

setupCanvas();

console.log('Canvas is ready to be set up.');

startLoop();

console.log('Canvas is set up.');
