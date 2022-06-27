/* Agregamos compatiblidad con varias navegadores */

const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

let request;

function loadDB() {
    /* Abrimos o creamos la base de datos. Si no la encuentra, la crea */
    request = indexedDB.open("GhibliDatabase", 1);

    request.onerror = function(event) {
        console.error("database error", event);
    };

    /* Se declara la estructura general de la BD */
    request.onupgradeneeded = function(event) {
        const db = request.result;
        const store = db.createObjectStore("movies", { keyPath: "id" }); // Creamos un "store" con un atributo unico
        store.createIndex("title", ["title"], { unique: true }); // Propiedad de titulo, es único ya que no hay movies llamados igual
        store.createIndex("descripcion", ["descripcion"], { unique: true }); // Propiedad de titulo, es único ya que no hay movies llamados igual
        store.createIndex("aniolanzamiento", ["aniolanzamiento"], { unique: true }); // Propiedad de titulo, es único ya que no hay movies llamados igual
    };

    // Si todo sale bien, ejecutamos esta funcion

    return new Promise((resolve) => {
        request.onsuccess = function() {
            const db = request.result;
            resolve(db);
        };
    });
}

function addmovieToDB(movie) {
    const db = request.result;

    const transaction = db.transaction("movies", "readwrite");
    const store = transaction.objectStore("movies");

    store.put({ id: movie.id, title: movie.title, descripcion: movie.descripcion, aniolanzamiento: movie.aniolanzamiento });
}

function getStoredmovies() {
    const db = request.result;
    const transaction = db.transaction("movies", "readwrite");
    const store = transaction.objectStore("movies");
    const queryAll = store.getAll();
    return new Promise((resolve) => {
        queryAll.onsuccess = function() {
            resolve(queryAll.result);
        };
    });
}

export { loadDB, addmovieToDB, getStoredmovies };