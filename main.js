import { checkColorMode, handleChangeColor } from "./modules/theme.js";
import { loadDB } from "./modules/db.js";
import { removeSavedItems, showSavedItems } from "./modules/movieItem.js";
import { getMoviesData } from "./modules/fetchData.js";
import { renderMovies } from "./modules/movieItem.js";

async function onLoad() {
    handleChangeColor();
    checkColorMode();

    /* Iniciamos indexDB */
    await loadDB();

    const pathname = window.location.pathname.split("/");
    const location = pathname[pathname.length - 1];

    const data = await getMoviesData();
    renderMovies(data);

    if (location === "index.html") {
        removeSavedItems();
    } else {
        showSavedItems(data);
    }
}

onLoad();