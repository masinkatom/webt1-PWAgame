
function returnToMainPage() {
  window.location.href = "index.html";
}

function resetGame() {
  // Funkcia na vymazanie uloženého stavu hry
  localStorage.removeItem('gameState');
  // Reset hodnôt checkboxov
  document.getElementById('musicCheckbox').checked = true;
  document.getElementById('soundCheckbox').checked = true;
}

if (localStorage.getItem("maxLevel") === null) {
  localStorage.setItem("maxLevel", 1);
}
else {
  localStorage.setItem("maxLevel", 1)
}

document.addEventListener('DOMContentLoaded', function () {
  const musicCheckbox = document.getElementById('musicCheckbox');
  const soundCheckbox = document.getElementById('soundCheckbox');


  musicCheckbox.checked = window.music.getValue();
  soundCheckbox.checked = window.sound.getValue();


  musicCheckbox.addEventListener('change', function () {
    window.music.handler(this.checked);
  });

  soundCheckbox.addEventListener('change', function () {
    window.sound.handler(this.checked);
  });
  soundCheckbox.addEventListener('change', function () {
    console.log('Sound Checkbox Changed:', this.checked);
    window.sound.handler(this.checked);
  });
});