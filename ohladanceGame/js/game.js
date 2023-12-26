import { Player } from "./Player.js";

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);

        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                this.player.update(-10);
            }
            if (e.key === "ArrowRight") {
                console.log("right");
                this.player.update(10);
            }
        });

        if (DeviceMotionEvent &&
            typeof DeviceMotionEvent.requestPermission === "function") {
            DeviceMotionEvent.requestPermission();
        }

        window.addEventListener("deviceorientation", (e) => {
            this.player.x = e.gamma;
        });


    }

    update() {

    }

    draw(ctx) {
        this.player.draw(ctx);
    }
}