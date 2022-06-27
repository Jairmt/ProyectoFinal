import { addmovieToDB, getStoredmovies } from "./db.js";

const contentGrid = document.querySelector("#movie-grid");

function handleSaveItem() {
    const watchedBtns = document.querySelectorAll("#watched-button");
    watchedBtns.forEach((button) => {
        const movieId = button.getAttribute("data-movie-id");
        const movieItem = document.querySelector(`#movie-item-${movieId}`);
        const movieTitle = movieItem.querySelector("#movie-item-title").innerText;
        const movieDescripcion = movieItem.querySelector("#movie-item-desc").innerText;
        const movieAniolanzamiento = movieItem.querySelector("#movie-item-anio").innerText;
        button.addEventListener("click", function() {
            addmovieToDB({ id: movieId, title: movieTitle, descripcion: movieDescripcion, aniolanzamiento: movieAniolanzamiento });
            contentGrid.removeChild(movieItem);
        });
    });
}

async function removeSavedItems() {
    const storedmovies = await getStoredmovies();
    const childrenNodes = [...contentGrid.children];

    const savedmovies = childrenNodes.filter((presentItem) => {
        return storedmovies.find((storedItem) => {
            const presentItemTitle =
                presentItem.querySelector("#movie-item-title").innerText;
            return presentItemTitle === storedItem.title;
        });
    });

    savedmovies.forEach((movie) => {
        contentGrid.removeChild(movie);
    });
}

async function showSavedItems() {
    const storedmovies = await getStoredmovies();
    const childrenNodes = [...contentGrid.children];

    const notSavedmovies = childrenNodes.filter((presentItem) => {
        return !storedmovies.find((storedItem) => {
            const presentItemTitle =
                presentItem.querySelector("#movie-item-title").innerText;
            return presentItemTitle === storedItem.title;
        });
    });

    notSavedmovies.forEach((movie) => {
        contentGrid.removeChild(movie);
    });
}

function renderMovies(movies) {
    const contentGrid = document.querySelector("#movie-grid");
    const children = movies
        .map((movie, key) => {
            const movieItem = `
        <div class="movie-item" id="movie-item-${movie.id}">
            <img class="movie-item__image" src="
            ${movie.image}" alt="movie-title" />
            <div class="movie-item__content" id="movie-item-">
                <a class="movie-item__content__title" rel="noopener" id="movie-item-title">
                ${movie.title}
                </a>
                <p id="movie-item-desc">${movie.description.substr(0, 100)}..</p>
                <p id="movie-item-anio">release date: ${movie.release_date}</p>
                <button id="watched-button" data-movie-id="${
                  movie.id
                }" data-type="filled">Watched</button>
            </div>
        </div>
        `;
            return movieItem;
        })
        .join("");
    contentGrid.innerHTML = children;
    handleSaveItem();
}

export { handleSaveItem, removeSavedItems, showSavedItems, renderMovies };