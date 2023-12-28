const Y_MAX = 2000;

export class EnemyBar {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = game.width;
        this.height = 10;
        this.yPos = 0;
        this.toDelete = false;
    }

    update(speed) {
        this.y = this.yPos * (this.game.height / Y_MAX);
        this.yPos += speed;
        

        // if obstacle is off screen
        if (this.yPos >= Y_MAX) {
            this.yPos = 0;
            this.toDelete = true;
        }
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }




}