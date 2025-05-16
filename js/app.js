// main.js
import { setupCanvas, getContext } from './canvas.js';

setupCanvas();

const ctx = getContext();
ctx.fillStyle = 'red';
ctx.fillRect(40, 40, 40, 40);

console.log('Canvas is set up.');
