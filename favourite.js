
const getFavourite = () =>{
    let movies = "";
    let favouriteList = sessionStorage.getItem("favouriteList");
    if (favouriteList && favouriteList.length > 0) {

        JSON.parse(favouriteList)?.map((item, i) => {
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
                                                    <div class="flex-shrink-1 bd-highlight" onclick="removeFavourite('${item.imdbID}');">
                                                        <i class="icon-red fa-solid fa-heart"></i>
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
    if (movies != "")
        document.getElementById('favouriteResult').innerHTML = movies;
}

let favouriteList = sessionStorage.getItem("favouriteList")
if (sessionStorage.getItem("favouriteList") && favouriteList && JSON.parse(favouriteList).length > 0) {
    getFavourite();
}