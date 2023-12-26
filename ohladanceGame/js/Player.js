export class Player {
    constructor(game) {
        this.game = game;
        this.radius = game.width * 0.065;
        this.x = game.width / 2;
        this.y = game.height * 0.8;
        
    }

    update(xToUPdate) {
        this.x += xToUPdate;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}