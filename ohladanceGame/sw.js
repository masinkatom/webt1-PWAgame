const cacheName = 'ballin-v1';
// tu piseme vsetky requesty, ktore chceme aby sa ulozili do cache
const appAssets = [
    'manifest.json',
    '',   
    'index.html',
    'chooseLevel.html',
    'game.html',
    'instructions.html',
    'settings.html',
    'css/game.css',
    'css/hlavnaObrazovka.css',
    'css/main.css',
    'data/levels.json',
    'images/icons/128.png',
    'images/icons/144.png',
    'images/icons/152.png',
    'images/icons/196.png',
    'images/icons/256.png',
    'images/icons/512.png',
    'images/icons/1024.png',
    'images/ball.png',
    'images/ball-48.png',
    'images/ball-72.png',
    'images/ball-96.png',
    'images/ball-144.png',
    'images/ball-192.png',
    'images/ball-512.png',
    'images/background-sky-night.png',
    'images/cobblestone.png',
    'images/pause.svg',
    'images/play.svg',
    'js/app.js',
    'js/EnemyBar.js',
    'js/Game.js',
    'js/hlavnaObrazovka.js',
    'js/instructions.js',
    'js/levels.js',
    'js/Line.js',
    'js/main.js',
    'js/music.js',
    'js/Player.js',
    'js/settings.js',
    'js/UI.js',
    'music/test.mp3',
    'music/test2.mp3',
    'https://fonts.gstatic.com/s/didactgothic/v20/ahcfv8qz1zt6hCC5G4F_P4ASlUuYpg.woff2',
    'https://fonts.googleapis.com/css2?family=Didact+Gothic&family=Righteous&display=swap'
];

self.addEventListener('install', (e) => {
console.log("sw installed;", e);
    e.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                cache.addAll(appAssets);
            })
    );

});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(cacheRes => {
            // return response if found in cache or do a request
            return cacheRes || fetch(e.request);
        })
    );

});