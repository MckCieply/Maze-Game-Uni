export class PlayerInput {
    constructor() {
        this.keys = new Set();

        // Bind event listeners
        window.addEventListener('keydown', (event) => this.onKeyDown(event));
        window.addEventListener('keyup', (event) => this.onKeyUp(event));
    }

    onKeyDown(event) {
        this.keys.add(event.key);
    }

    onKeyUp(event) {
        this.keys.delete(event.key);
    }

    isKeyPressed(key) {
        return this.keys.has(key);
    }
}