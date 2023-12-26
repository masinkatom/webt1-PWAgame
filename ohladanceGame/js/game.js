export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
    }

    update() {

    }

    draw(ctx) {
        this.player.draw(ctx);
    }
}