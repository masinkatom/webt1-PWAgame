const cacheName = 'ballin-v1';
// tu piseme vsetky requesty, ktore chceme aby sa ulozili do cache
const appAssets = [
    '',   
    'index.html',
    'game.html',
    'css/main.css',
    'images/ball.png',
    'images/icons/128.png',
    'js/app.js',
    'js/game.js',
    'js/ui.js',
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
    console.log("sw fetch event", e);
})