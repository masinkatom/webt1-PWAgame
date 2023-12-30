import { Line } from "./Line.js";

const UPDATE_INTERVAL = 16;
const Y_MAX = 2000;

export class EnemyBar {
    constructor(game, double) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = game.width;
        this.height = 10;
        this.yPos = 0;
        this.toDelete = false;
        this.updateTime = 0;
        this.emptyIndex = Math.floor(Math.random() * 5);
        this.emptyIndex2 = this.emptyIndex;
        if (double) {
            this.emptyIndex2 = Math.floor(Math.random() * 5);
        }
        
        console.log(this.emptyIndex, "ei2",this.emptyIndex2);
        this.lines = [];
        this.fillLines();
    }

    update(speed, deltaTime) {
        this.updateTime += deltaTime;
        
        // update of position with regards of screen height and refresh rate
        if (this.updateTime > UPDATE_INTERVAL) {
            this.updateTime -= UPDATE_INTERVAL;
            this.y = this.yPos * (this.game.height / Y_MAX);
            this.yPos += speed;
        }

        // if obstacle is off screen
        if (this.y >= this.game.height) {
            this.toDelete = true;
        }
        
    }

    draw(ctx) {
        this.lines.forEach(line => {
            ctx.fillRect(line.x, this.y, line.width, line.height);
            line.y = this.y;
        });
    }

    fillLines() {
        let xTmp = 0;
        for (let i = 0; i < 5; i++) {
            if(i != this.emptyIndex && i != this.emptyIndex2) {
                this.lines.push(new Line(xTmp, this.y, this.width/5, this.height));
            }
            xTmp += this.width/5;
        }
    }

}