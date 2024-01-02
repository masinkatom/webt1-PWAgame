
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
  localStorage.setItem("maxLevel", 1);}
else{
    localStorage.setItem("maxLevel", 1)
  }

