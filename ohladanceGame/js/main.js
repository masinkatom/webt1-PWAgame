import { Game } from "./Game.js";

const GAME_HEIGHT = window.innerHeight - 6;
const GAME_WIDTH = GAME_HEIGHT / 2;

let obstacleAmount = 0;

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

    function animate(currentTime) {
        const deltaTime = currentTime - prevTime;
         
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        game.update(deltaTime);
        game.draw(ctx);
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

