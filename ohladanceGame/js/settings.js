function returnToMainPage() {
	window.location.href = "index.html";
}

function resetGame() {
	// Funkcia na vymazanie uloženého stavu hry

	if (localStorage.getItem("maxLevel") === null) {
		localStorage.setItem("maxLevel", 1);
	}
	else {
		localStorage.setItem("maxLevel", 1)
	}
	// Reset hodnôt checkboxov
	document.getElementById('musicCheckbox').checked = true;
}



document.addEventListener('DOMContentLoaded', function () {
	const musicCheckbox = document.getElementById('musicCheckbox');

	musicCheckbox.checked = window.music.getValue();

	musicCheckbox.addEventListener('change', function () {
		window.music.handler(this.checked);
	});

});