import { Game } from "./Game.js";

const GAME_HEIGHT = window.innerHeight - 6;
const GAME_WIDTH = window.innerWidth - 6;

let obstacleAmount = 0;
let btnPause = document.getElementById("pause");

window.addEventListener("load", async () => {
    await loadData();
    
    /**
     * @type {HTMLCanvasElement}
     */
    const gameCanvas = document.getElementById("canvas1");
    const ctx = gameCanvas.getContext("2d");
    
    console.log("W ", GAME_WIDTH, ", H ", GAME_HEIGHT);
    
    gameCanvas.width = GAME_WIDTH;
    gameCanvas.height = GAME_HEIGHT;
    let prevTime = 0;
    
    const game = new Game(GAME_WIDTH, GAME_HEIGHT);

    btnPause.addEventListener("click", () => {
        if (!game.paused) {
            game.paused = true;
            btnPause.innerHTML = `<img src="images/play.svg" alt="pause">`;
        }
        else {
            game.paused = false;
            btnPause.innerHTML = `<img src="images/pause.svg" alt="pause">`;
        }
        console.log(game.paused);
    });

    window.addEventListener("blur", () => {
        game.paused = true;
        btnPause.innerHTML = `<img src="images/play.svg" alt="pause">`;
    });

    window.addEventListener("focus", () => {
        game.paused = false;
        btnPause.innerHTML = `<img src="images/pause.svg" alt="pause">`;
    });

    function animate(currentTime) {
        if (!game.paused) {
            const deltaTime = currentTime - prevTime;

            ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            game.update(deltaTime);
            game.draw(ctx);
        }
        prevTime = currentTime;
        requestAnimationFrame(animate);
    }
    animate(0);

});

async function loadData() {
    return fetch('./data/levels.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return null;
        })
        .then(result => {

            if (result != null) {
                console.log(result.levels);
            }
            else {
                console.error("response is empty");
            }
        });
}
