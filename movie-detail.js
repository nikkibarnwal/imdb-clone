let apiKey = 'f20babdd';
let apiBaseUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;

const getMoviesDetail = async () => {
    let params = (new URL(document.location)).searchParams;
    let imdbID = params.get("imdbid");
    let response = await fetch(`${apiBaseUrl}&i=${imdbID}`);
    let movieDetail = "";
    if (response.status === 200) {
        respJson = await response.json();
        console.log("Rajendra ", respJson);
        // let heartIcon = `<i class="fa-regular fa-heart"></i>`;
        //         let favouriteFunction = `addFavourite('${respJson.imdbID}')`;
        //         if (favouriteId.includes(respJson.imdbID)) {
        //             heartIcon = `<i class="icon-red fa-solid fa-heart"></i>`;

        //             favouriteFunction = `removeFavourite('${item.imdbID}')`;
        //         }

       
        movieDetail = `<div class="row g-0">
                            <div class="col-md-4">
                                <img src="${respJson.Poster}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <div class="d-flex bd-highlight">
                                        <div class="w-100 bd-highlight">
                                                <h5 class="card-title">${respJson.Title} </h5>
                                        </div>
                                        <div class="flex-shrink-1 bd-highlight" onclick="removeFavourite('${respJson.imdbID}')">
                                            <i class="icon-red fa-solid fa-heart"></i>
                                        </div>
                                    </div>
                                   
                                    <p class="card-text">${respJson.Plot}</p>
                                    <p class="border-bottom card-text pb-2 mb-0"><b>Genre:</b> ${respJson?.Genre}</p>
                                    <p class="card-text border-bottom pb-2 mb-2"><b>Director:</b> ${respJson?.Director}</p>
                                    <p class="card-text border-bottom pb-2 mb-2"><b>Writer:</b> ${respJson?.Writer}</p>
                                    <p class="card-text border-bottom pb-2 mb-2"><b>Stars:</b> ${respJson?.Actors}</p>
                                    <p class="card-text border-bottom pb-2 mb-2"><b>IMDB Ratings:</b> ${respJson?.imdbRating}</p>
                                    <p class="card-text border-bottom pb-2 mb-2"><b>IMDB Votes:</b> ${respJson?.imdbVotes}</p>
                                    <p class="card-text border-bottom pb-2 mb-2"><b>Awards:</b> ${respJson?.Awards}</p>
                                    <p class="card-text"><small class="text-muted">Released ${respJson?.Released}</small></p>
                                </div>
                            </div>
                        </div>`

        let topTitle = `<span class="text-white" id="searchedFor">${respJson.Title}</span>
                         <small>(${respJson.Year})</small>`;
        document.getElementById('title').innerHTML = topTitle;

    }
    if (movieDetail !== "") {
        document.getElementById('movieDetailDiv').innerHTML = movieDetail;

    }
}
getMoviesDetail();