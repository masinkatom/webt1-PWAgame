if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../ohladanceGame/sw.js')
        .catch((err) => console.log("sw not registered", err));
}