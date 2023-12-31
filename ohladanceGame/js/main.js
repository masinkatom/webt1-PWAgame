import { Game } from "./Game.js";

let GAME_HEIGHT = window.innerHeight - 9;
let GAME_WIDTH = GAME_HEIGHT / 2;

if (GAME_HEIGHT / 2 > window.innerWidth) {
    GAME_WIDTH = window.innerWidth - 5;
    GAME_HEIGHT = GAME_WIDTH * 2;
}

let btnPause = document.getElementById("pause");
let endMsg = document.querySelector(".endscreen");
let currentLevel = 0;
let obstacleAmount = 0;
let speed = 0;

window.addEventListener("load", async () => {
    await loadData();

    /**
     * @type {HTMLCanvasElement}
     */
    const gameCanvas = document.getElementById("canvas1");
    const ctx = gameCanvas.getContext("2d");

    console.log("W ", GAME_WIDTH, ", H ", GAME_HEIGHT, ", OBS ", obstacleAmount, ", SPEED ", speed);

    gameCanvas.width = GAME_WIDTH;
    gameCanvas.height = GAME_HEIGHT;
    let prevTime = 0;

    let game = new Game(GAME_WIDTH, GAME_HEIGHT, currentLevel, obstacleAmount, speed);

    const handleClickCanvas = () => {
        btnPause.style.display = "flex";
        game.paused = false;
        game.started = true;
        gameCanvas.removeEventListener("click", handleClickCanvas);
    };

    gameCanvas.addEventListener("click", handleClickCanvas);

    btnPause.addEventListener("click", () => {
        if (!game.paused) {
            game.paused = true;
            btnPause.innerHTML = `<img src="images/play.svg" alt="pause">`;
        }
        else {
            game.paused = false;
            btnPause.innerHTML = `<img src="images/pause.svg" alt="pause">`;
        }
        console.log("paused ", game.paused);
    });

    window.addEventListener("blur", () => {
        game.paused = true;
        btnPause.innerHTML = `<img src="images/play.svg" alt="pause">`;
    });

    window.addEventListener("focus", () => {
        btnPause.style.display = "flex";
        game.paused = false;
        btnPause.innerHTML = `<img src="images/pause.svg" alt="pause">`;
    });

    function animate(currentTime) {
        if (!game.ended) {
            if (!game.started) {
                game.ui.draw(ctx);
                game.ui.drawCobbles(ctx);
                game.ui.drawStartMsg(ctx);
            }
    
            if (game.failed) {
                game = new Game(GAME_WIDTH, GAME_HEIGHT, currentLevel, obstacleAmount, speed);
                gameCanvas.addEventListener("click", handleClickCanvas);
            }
    
            if (!game.paused) {
                const deltaTime = currentTime - prevTime;
                ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                game.update(deltaTime);
                game.draw(ctx);
            }

            prevTime = currentTime;
            requestAnimationFrame(animate);
        }
        else {
            endMsg.style.display = "flex";
            animateEnd();
        }
    }
    animate(0);

    function animateEnd() {
        if (game.player.x < GAME_WIDTH + game.player.radius + 1) {

            ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            game.player.x += 4;
            game.player.draw(ctx);
            game.draw(ctx);
            requestAnimationFrame(animateEnd);
        }
    }
});


async function loadData() {

    currentLevel = localStorage.getItem("levelId");
    console.log(currentLevel);

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
                getCurrLevelData(result.levels[currentLevel - 1]);
            }
            else {
                console.error("response is empty");
            }
        });
}

async function getCurrLevelData(level) {
    obstacleAmount = level.obstacles;
    speed = level.speed;
}
