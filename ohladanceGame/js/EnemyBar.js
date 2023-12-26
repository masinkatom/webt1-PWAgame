class EnemyBar {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = GAME_WIDTH;
        this.height = 10;
        this.yPos = 0;
    }

    draw(ctx) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.y = this.yPos * (GAME_HEIGHT / Y_MAX);
        this.yPos++;
        if (this.yPos >= Y_MAX) {
            this.yPos = 0;
        }
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }


}