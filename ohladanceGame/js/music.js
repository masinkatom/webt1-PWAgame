(() => {
	const MUSIC = new Audio('music/test.mp3');
	MUSIC.volume = 0.03;
	MUSIC.loop = true;

	const MUSIC_STORAGE = 'misw-settings-music';
	let musicEnabled = JSON.parse(window.localStorage.getItem(MUSIC_STORAGE));
	musicEnabled = musicEnabled === null ? true : musicEnabled;

	const SOUND = new Audio('music/test2.mp3');
	console.log(SOUND); // Add this line to check if there are any issues with the audio object
	SOUND.volume = 0.1;

	const SOUND_STORAGE = 'misw-settings-sound';
	let soundEnabled = JSON.parse(window.localStorage.getItem(SOUND_STORAGE));
	soundEnabled = soundEnabled === null ? true : soundEnabled;

	window.music = {
		play: () => {
			if (musicEnabled) {
				MUSIC.play();
			}
		},
		pause: MUSIC.pause,
		getValue() {
			return musicEnabled;
		},
		handler(value) {
			musicEnabled = value;
			window.localStorage.setItem(MUSIC_STORAGE, musicEnabled);

			if (value) {
				this.play();
			} else {
				this.pause();
			}
		}
	}

	window.sound = {
		play: () => {
			if (soundEnabled) {
				SOUND.currentTime = 0;
				SOUND.play();
			}
		},
		pause: SOUND.pause,
		getValue() {
			return soundEnabled;
		},
		handler(value) {
			soundEnabled = value;
			window.localStorage.setItem(SOUND_STORAGE, soundEnabled);

			if (!value) {
				this.pause();
			}
		}
	}

	MUSIC.addEventListener('canplaythrough', () => {
		const musicAutostart = setInterval(() => {
			if (!musicEnabled)
				return clearInterval(musicAutostart);
			MUSIC.play()
				.then(() => clearInterval(musicAutostart))
				.catch(() => { });
		}, 100);
	});

})();