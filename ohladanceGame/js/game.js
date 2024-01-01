import { EnemyBar } from "./EnemyBar.js";
import { Player } from "./Player.js";
import { UI } from "./UI.js";

export class Game {
    constructor(width, height, level, obstacleAmount, speed, genTime) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.speed = speed;
        this.obstacles = [];
        this.obstacleAmount = obstacleAmount;
        this.obstacleCounter = 0;
        this.enemyTimer = 0;
        this.enemyInterval = genTime * 1000;
        this.paused = true;
        this.started = false;
        this.failed = false;
        this.ended = false;
        this.doubleCounter = 0;
        this.level = level;
        this.ui = new UI(this);

        this.addMovementListeners();
        
    }

    // method to updatee items on canvas, called from animate every couple miliseconds
    update(deltaTime) {
        
        this.checkForCollision();
        if (this.obstacleCounter > 0) {
            if (this.obstacles[this.obstacles.length-1].y > this.player.y + 50) {
                this.ended = true;
            }
        }
        
        // doubleCounter is to decide whether is it time for obstacle with two "holes"
        if (this.enemyTimer > this.enemyInterval) {
            // generate only certain amount of obstacles
            if (this.obstacleCounter < this.obstacleAmount) {
                if (this.doubleCounter == 2) {
                    this.addObstacle(true);
                    this.doubleCounter = 0;
                }
                else {
                    this.addObstacle(false);
                }
                this.obstacleCounter ++;
                this.enemyTimer = 0;
                this.doubleCounter++;

            }
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
        this.ui.draw(ctx);
        if (this.started) {
            this.player.draw(ctx);
            this.obstacles.forEach(obstacle => {
                if (obstacle.toDelete) {
                    this.removeObstacle(obstacle);
                }
                obstacle.draw(ctx);
            });
        }
        this.ui.drawCobbles(ctx);
        
    }

    // addition of one obstaclee
    addObstacle(double) {
        this.obstacles.push(new EnemyBar(this, double));
        console.log(this.obstacles);
    }

    // removal of one obstacle
    removeObstacle(obstacle) {
        this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
    }

    checkForCollision() {
        this.obstacles.forEach(obstacle => {
            obstacle.lines.forEach((line, index) => {

                //console.log("x: ", this.player.x, "y:", this.player.y);
                // from https://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle

                // Find the vertical & horizontal (distX/distY) distances between the 
                // circle’s center and the rectangle’s center
                let distX = Math.abs(this.player.x - line.x - (line.width / 2));
                let distY = Math.abs(this.player.y - line.y - (line.height / 2));

                // If the distance is greater than halfCircle + halfRect, 
                // then they are too far apart to be colliding, so we
                // get out of this iteration of loop
                if (distX > (line.width / 2 + this.player.radius)) {
                    return;
                }
                if (distY > (line.height / 2 + this.player.radius)) {
                    return;
                }

                // If the distance is less than halfRect then they are definitely colliding
                if (distX <= (line.width / 2)) {
                    this.paused = true;
                    this.failed = true;
                    return true;
                }
                if (distY <= (line.height / 2)) {
                    this.paused = true;
                    this.failed = true;
                    return true;
                }

                // Pythagoras formula to compare the distance between circle and rect centers.
                let dx = distX - line.width / 2;
                let dy = distY - line.height / 2;

                if ((dx * dx + dy * dy) <= (this.player.radius * this.player.radius)) {
                    this.paused = true;
                    this.failed = true;
                    return true;
                }

            });


        });
        return false;

    }

    addMovementListeners() {
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
            this.player.update(leftToRight *0.4);
        };
    }


}