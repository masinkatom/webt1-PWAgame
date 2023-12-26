import { Game } from "./Game.js";

const GAME_HEIGHT = window.innerHeight - 6;
const GAME_WIDTH = GAME_HEIGHT / 2;
const Y_MAX = 2000;

window.addEventListener("load", function() {
    /**
     * @type {HTMLCanvasElement}
     */
    const gameCanvas = document.getElementById("canvas1");
    const ctx = gameCanvas.getContext("2d");

    console.log("W ", GAME_WIDTH, ", H ", GAME_HEIGHT);

    gameCanvas.width = GAME_WIDTH;
    gameCanvas.height = GAME_HEIGHT;
    
    //const enemyBar = new EnemyBar();
    
    const game = new Game(GAME_WIDTH, GAME_HEIGHT);
    let b = 0;

    function animate() {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        game.update();
        game.draw(ctx);
        b++;
        if (b % 144 == 0) {
            console.log(b);
        }
        requestAnimationFrame(animate);
    
    }
    animate();

});

