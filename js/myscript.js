$(document).ready(function() {
    $("#searchBtn").on("click", function() {
        event.preventDefault();


        let search = $("#searchTextbox").val();
        let type = $("#typeSelect").val();

        getMovies(search, type)
    });

    $(".movie-details-link").on('click', function() {
        event.preventDefault();
        alert("sdf");
    });


    function getMovies(s, type) {
        $.ajax({
            method: "GET",
            url: `http://www.omdbapi.com/?apikey=26de17e&s=${s}&type=${type}`,
   
            success: function(data) {
                console.log(data.Search);
                displayData(data);
            },
    
            error: function(error) {
                console.error(error.status);
            },
        });
    }

    function displayData(data) {
        let container = $(".movie-container");
        container.empty();

        let movieItem = null;

        for (let movie of data.Search) {
            let template = `
                <img src="${movie.Poster}" class="movie-cover" alt="${movie.Title}">
                <div class="movie-description">
                    <p class="movie-type">${movie.Type}</p>
                    <p class="movie-title">${movie.Title}</p>
                    <p class="movie-year">${movie.Year}</p>
                    <input type="hidden" name="movieId" value="${movie.imdbID}">
                    <a class="movie-details-link" href="#">Movie details</a>
                </div>`;

            // create movie item element
            movieItem = document.createElement("div");
            movieItem.classList.add("movie-item");
            movieItem.innerHTML = template;

            
            container.append(movieItem);
        }
    }
});