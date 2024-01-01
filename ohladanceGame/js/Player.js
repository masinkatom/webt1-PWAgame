export class Player {
    constructor(game) {
        this.game = game;
        this.radius = game.width * 0.065;
        this.x = game.width / 2;
        this.y = game.height * 0.8;
        this.image = new Image();
        this.image.src = "./images/ball-72.png";
    }

    // updates the player positioning only within canvas
    update(xToUPdate) {
        if (this.x + xToUPdate > 0 && this.x + xToUPdate < this.game.width) {
            this.x += xToUPdate;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.drawImage(this.image, this.x - (this.radius), this.y - (this.radius), this.radius * 2, this.radius * 2);
    }
} 