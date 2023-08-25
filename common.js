
const removeFavourite = (moviesId) => {
    if (sessionStorage.getItem("favouriteList")) {
        let favouriteList = sessionStorage.getItem("favouriteList");
        let favour = JSON.parse(favouriteList);
        let updatedFavour = favour.filter((item) => item.imdbID !== moviesId);
        sessionStorage.setItem("favouriteList", JSON.stringify(updatedFavour));
        getMovies();
    }
}
const searchData = async () => {
    let userInput = document.getElementById('searchInput').value;
    if (userInput !== "") {
        window.location.href = "index.html?str=" + userInput;
    }
};

// get current url
const currentUrl = window.location.href;
// to get query string parameter we use URLSearchParams object
const urlParams = new URLSearchParams(window.location.search);
// to get query string value 
const searchStr = urlParams.get('str');
//if query string value is not blank , and page will be index.html then call getData() function
if (searchStr && searchStr !== "" && currentUrl.includes('index')) {
    console.log("calling", searchStr);
    // call getData() from index.js file
    getData(searchStr);
}