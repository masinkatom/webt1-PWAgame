(() => {
  const MUSIC = new Audio('music/test.mp3');
  MUSIC.volume = 0.03;
  MUSIC.loop = true;

  const MUSIC_STORAGE = 'misw-settings-music';
  let musicEnabled = JSON.parse(window.localStorage.getItem(MUSIC_STORAGE));
  musicEnabled = musicEnabled === null ? true : musicEnabled;

  const SOUND = new Audio('music/test2.mp3');
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
        .catch(() => {});
    }, 100);
  });

})();

document.addEventListener('DOMContentLoaded', function () {
  const musicCheckbox = document.getElementById('musicCheckbox');
  const soundCheckbox = document.getElementById('soundCheckbox');

  // Установите начальные значения чекбоксов
  musicCheckbox.checked = window.music.getValue();
  soundCheckbox.checked = window.sound.getValue();

  // Добавьте обработчики событий для чекбоксов
  musicCheckbox.addEventListener('change', function () {
    window.music.handler(this.checked);
  });

  soundCheckbox.addEventListener('change', function () {
    window.sound.handler(this.checked);
  });
});

function returnToMainPage() {
  // Здесь вы можете добавить код для возврата на главную страницу
  window.location.href = "index.html";
}

