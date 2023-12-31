// levels.js
function returnToMainPage() {
    window.location.href = "index.html";
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
            linkToGame.href = "game.html";
            const button = document.createElement("button");
            button.textContent = `LEVEL ${level.id}`; 
            button.addEventListener("click", function () {
                console.log(`Selected Level: ${level.id}`);
                localStorage.setItem("levelId", level.id);
                console.log(localStorage);
            });
            linkToGame.appendChild(button);
            levelContainer.appendChild(linkToGame);
        });
    }
});

