
// let apiKey = 'f20babdd';
let apiBaseUrl = `http://www.omdbapi.com/?apikey=f20babdd`;
let baseUrl = "";

const addFavourite = (moviesId) => {
    let sessionMoviesList = sessionStorage.getItem("moviesList");
    if (sessionStorage.getItem("moviesList")) {
        if (JSON.parse(sessionMoviesList).length > 0) {
            favouriteMovie = JSON.parse(sessionMoviesList).filter((item) => item.imdbID === moviesId);
            if (sessionStorage.getItem("favouriteList")) {
                let favouriteList = sessionStorage.getItem("favouriteList");
                let favour = JSON.parse(favouriteList);
                let alreadyInFavour = favour.some((item) => item.imdbID === moviesId);
                if (!alreadyInFavour) {
                    favour.push(favouriteMovie[0]);
                    sessionStorage.setItem("favouriteList", JSON.stringify(favour));
                }
            } else {
                sessionStorage.setItem("favouriteList", JSON.stringify(favouriteMovie));
            }
            getMovies();

        }
    }
}
const getMovies = () => {
    let movies = "";

    if (sessionStorage.getItem("moviesList")) {
        let moviesList = sessionStorage.getItem("moviesList");
        let favouriteList = sessionStorage.getItem("favouriteList");
        let favouriteId = [];
        if (favouriteList && JSON.parse(favouriteList).length > 0) {
            favouriteId = JSON.parse(favouriteList).map(value => value.imdbID);
        }
        if (moviesList && moviesList !== "undefined") {
            JSON.parse(moviesList)?.map((item, i) => {
                let heartIcon = `<i class="fa-regular fa-heart"></i>`;
                let favouriteFunction = `addFavourite('${item.imdbID}')`;
                if (favouriteId.includes(item.imdbID)) {
                    heartIcon = `<i class="icon-red fa-solid fa-heart"></i>`;

                    favouriteFunction = `removeFavourite('${item.imdbID}')`;
                }
                let cardBorder = i % 2 === 0 ? 'border-primary' : 'border-success';
                let moviePoster = item.Poster !== 'N/A' ? item.Poster : 'img/media-entertainment.png';
                movies += `<div class="col">
                                <div class="${cardBorder} card mb-3" style="max-width: 540px;">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <a href="movies-detail.html?imdbid=${item.imdbID}">
                                                <img src="${moviePoster}" class="img-fluid rounded-start moviesImg" alt="...">
                                            </a>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                            <div class="d-flex bd-highlight">
                                                    <div class="w-100 bd-highlight">
                                                        <a href="movies-detail.html?imdbid=${item.imdbID}" class="text-decoration-none">
                                                            ${item.Title}
                                                        </a>
                                                    </div>
                                                    <div class="flex-shrink-1 bd-highlight" onclick="${favouriteFunction}">
                                                    ${heartIcon}
                                                    </div>
                                                </div>
                                                <p class="card-text text-capitalize">${item.Type}</p>
                                                <p class="card-text"><small class="text-muted">Realease Year ${item.Year}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        `;
                i++;
            });
        }
    }
    if (movies != "")
        document.getElementById('searchResult').innerHTML = movies;
}
let sessionMoviesList = sessionStorage.getItem("moviesList")
if (sessionStorage.getItem("moviesList") && sessionMoviesList !== "") {
    // if (JSON.parse(sessionMoviesList).length > 0) {
    let sessionSearchInput = sessionStorage.getItem("searchInput");
    console.log("Raj test ", sessionSearchInput);
    document.getElementById('searchedFor').innerHTML = sessionSearchInput ? sessionSearchInput : "killl";
    getMovies();
    // }
}
const getData = async (str) => {
    if (str !== "") {
        let response = await fetch(`${apiBaseUrl}&type=movie&s=${str}`);
        console.log(response);
        if (response.status === 200) {
            document.getElementById('searchedFor').innerHTML= str;
            respJson = await response.json();
            let searchList = respJson.Search;
            sessionStorage.setItem("moviesList", JSON.stringify(searchList));
            sessionStorage.setItem("searchInput", str);
            getMovies();
        }
    }
}
