// levels.js
function returnToMainPage() {
    window.location.href = "index.html";
}

if (localStorage.getItem("maxLevel") === null) {
    localStorage.setItem("maxLevel", 1);
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("data/levels.json")
        .then(response => response.json())
        .then(data => displayLevels(data.levels))
        .catch(error => console.error("Error fetching levels:", error));

    function displayLevels(levels) {
        const levelContainer = document.querySelector(".level-container");

        levels.forEach(level => {
            const linkToGame = document.createElement("a");
            const button = document.createElement("button");
            button.style.cursor = "not-allowed";
            button.textContent = `LEVEL ${level.id}`;

            if (parseInt(localStorage.getItem("maxLevel")) >= parseInt(level.id)) {
                button.style.backgroundColor = "#61dafb";
                button.style.cursor = "pointer";
                linkToGame.href = "game.html";

                button.addEventListener("click", function () {
                    localStorage.setItem("levelId", level.id);
                });
            }
            linkToGame.appendChild(button);
            levelContainer.appendChild(linkToGame);
        });
    }
});

