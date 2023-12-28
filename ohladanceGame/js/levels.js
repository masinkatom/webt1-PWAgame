// levels.js
document.addEventListener("DOMContentLoaded", function () {
    fetch("data/levels.json")
        .then(response => response.json())
        .then(data => displayLevels(data.levels))
        .catch(error => console.error("Error fetching levels:", error));

    function displayLevels(levels) {
        const levelContainer = document.querySelector(".level-container");

        levels.forEach(level => {
            const button = document.createElement("button");
            button.textContent = `LEVEL ${level.id}`; // Используйте только id уровня
            button.addEventListener("click", function () {
                console.log(`Selected Level: ${level.id}`);
            });

            levelContainer.appendChild(button);
        });
    }
});

