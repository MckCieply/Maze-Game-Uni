import {checkTile, getTileIndexFromPixels} from './maze.js';
import {getCurrentMaze} from './config.js';

export function createPlayerMovementController(changeState) {
    let startX = 0;
    let startY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationStartTime = null;
    const animationDuration = 150;
    let isMoving = false;

    function init(startCoords) {
        startX = startCoords.x;
        startY = startCoords.y;
        targetX = startX;
        targetY = startY;
        animationStartTime = null;
        isMoving = false;
    }

    function getRenderPosition() {
        if (!isMoving || animationStartTime === null) {
            return { x: targetX, y: targetY };
        }
        const now = performance.now();
        const progress = Math.min(1, (now - animationStartTime) / animationDuration);
        const x = startX + (targetX - startX) * progress;
        const y = startY + (targetY - startY) * progress;

        if (progress >= 1) {
            isMoving = false;
        }

        return { x, y };
    }

    function tryMove(dx, dy, onSuccess, onFail) {
        if (isMoving) return false;

        const nextX = targetX + dx;
        const nextY = targetY + dy;

        const { row, col } = getTileIndexFromPixels(nextX, nextY);
        const tileType = checkTile(getCurrentMaze(), row, col);

        if (tileType === "wall") {
            onFail?.();
            changeState("failed");
            return false;
        }

        startX = targetX;
        startY = targetY;
        targetX = nextX;
        targetY = nextY;
        animationStartTime = performance.now();
        isMoving = true;

        if (tileType === "win") {
            changeState("success");
            onSuccess?.();
        }

        return true;
    }

    function isPlayerMoving() {
        return isMoving;
    }

    function getTargetPosition() {
        return { x: targetX, y: targetY };
    }

    return {
        init,
        tryMove,
        getRenderPosition,
        isPlayerMoving,
        getTargetPosition
    };
}
