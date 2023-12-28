// settings.js

function toggleMusic() {
    var musicCheckbox = document.getElementById("musicCheckbox");
    // Здесь добавьте код для управления воспроизведением музыки в соответствии с состоянием флажка
    if (musicCheckbox.checked) {
        // Включить музыку
        alert("Music turned ON");
    } else {
        // Выключить музыку
        alert("Music turned OFF");
    }
}

function toggleSound() {
    var soundCheckbox = document.getElementById("soundCheckbox");
    // Здесь добавьте код для управления воспроизведением звуковых эффектов в соответствии с состоянием флажка
    if (soundCheckbox.checked) {
        // Включить звук
        alert("Sound Effects turned ON");
    } else {
        // Выключить звук
        alert("Sound Effects turned OFF");
    }
}

function returnToMainPage() {
    // Здесь вы можете добавить код для возврата на главную страницу
    window.location.href = "index.html";
}
