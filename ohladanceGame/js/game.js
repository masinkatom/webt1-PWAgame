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
        this.keyHandler = this.handleKeys.bind(this);
        this.gyroHandler = this.handleGyro.bind(this);

    }

    // method to updatee items on canvas, called from animate every couple miliseconds
    update(deltaTime) {
        // end check
        this.checkForCollision();
        if (this.obstacleCounter > 0) {
            if (this.obstacles[this.obstacles.length - 1].y > this.player.y + 80) {
                this.ended = true;
                this.removeMovementListeners()
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
                this.obstacleCounter++;
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
    }

    // removal of one obstacle
    removeObstacle(obstacle) {
        this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
    }

    checkForCollision() {
        this.obstacles.forEach(obstacle => {
            obstacle.lines.forEach((line, index) => {

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
        window.addEventListener("keydown", this.keyHandler);

        // movement with device tilt/gyro sensor
        // ios support
        if (
            DeviceMotionEvent &&
            typeof DeviceMotionEvent.requestPermission === "function") {
            DeviceMotionEvent.requestPermission();
        }
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", this.gyroHandler);
        }
    }

    removeMovementListeners() {
        window.removeEventListener("keydown", this.keyHandler);

        if (window.DeviceOrientationEvent) {
            window.removeEventListener("deviceorientation", this.gyroHandler);
        }

        console.log("removedEventListeners");
    }

    handleKeys(e) {
        if (e.key === "ArrowLeft") {
            this.player.update(-12);
        }
        if (e.key === "ArrowRight") {
            this.player.update(12);
        }
    }

    handleGyro(e) {
        // gamma: left to right
        this.player.update(e.gamma * 0.4);
    }


}