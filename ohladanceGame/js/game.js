import { EnemyBar } from "./EnemyBar.js";
import { Player } from "./Player.js";

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.speed = 1;
        this.readyState = false;
        this.obstacles = [];
        this.enemyTimer = 0;
        this.enemyInterval = 3000;

        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                this.player.update(-10);
            }
            if (e.key === "ArrowRight") {
                this.player.update(10);
            }
        });

        if (DeviceMotionEvent &&
            typeof DeviceMotionEvent.requestPermission === "function") {
            DeviceMotionEvent.requestPermission();
        }

        window.addEventListener("deviceorientation", (e) => {
            this.player.update(e.gamma);
        });


    }

    update(deltaTime) {
        if (this.enemyTimer > this.enemyInterval) {
            this.addObstacle();
            this.enemyTimer = 0;
        }
        else {
            this.enemyTimer += deltaTime;
        }
        this.obstacles.forEach(obstacle => {
            obstacle.update(this.speed);
        });
    }

    draw(ctx) {
        this.player.draw(ctx);
        this.obstacles.forEach(obstacle => {
            if (obstacle.toDelete == true) {
                this.removeObstacle(obstacle);
            }
            obstacle.draw(ctx);
        });

        // if (readyState) {

        // }
    }

    addObstacle() {
        this.obstacles.push(new EnemyBar(this));
        console.log(this.obstacles);
    }

    removeObstacle(obstacle) {
        this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
    }
}