class Player {
    constructor(game) {
        this.game = game;
        this.radius = 50;
        this.x = (game.width / 2) - (this.radius / 2);
        this.y = 400;
        
    }

    update() {

    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}