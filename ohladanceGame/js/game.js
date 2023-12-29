import { EnemyBar } from "./EnemyBar.js";
import { Player } from "./Player.js";

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.speed = 2;
        this.obstacles = [];
        this.enemyTimer = 0;
        this.enemyInterval = 3000;
        this.paused = true;


        // movement with arrow keys
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                this.player.update(-10);
            }
            if (e.key === "ArrowRight") {
                this.player.update(10);
            }
        });


        // movement with device tilt/gyro sensor
        if (window.DeviceOrientationEvent) {
            window.addEventListener(
                "deviceorientation",
                (event) => {
                    const leftToRight = event.gamma; // gamma: left to right
                    handleOrientationEvent(leftToRight);
                },
                true,
            );
        }

        const handleOrientationEvent = (leftToRight) => {
            this.player.update(leftToRight);
        };
    }

    // method to updatee items on canvas, called from animate every couple miliseconds
    update(deltaTime) {
        if (this.enemyTimer > this.enemyInterval) {
            this.addObstacle();
            this.enemyTimer = 0;
        }
        else {
            this.enemyTimer += deltaTime;
        }
        this.obstacles.forEach(obstacle => {
            obstacle.update(this.speed, deltaTime);
        });
    }

    // method to draw items on canvas, called from animate every couple miliseconds
    draw(ctx) {
        this.player.draw(ctx);
        this.obstacles.forEach(obstacle => {
            if (obstacle.toDelete) {
                this.removeObstacle(obstacle);
            }
            obstacle.draw(ctx);
        });
    }

    // addition of one obstaclee
    addObstacle() {
        this.obstacles.push(new EnemyBar(this));
        console.log(this.obstacles);
    }

    // removal of one obstacle
    removeObstacle(obstacle) {
        this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
    }


}