$(document).ready(function(){
    let currentPage = 1
    let movies
    let movieSearchText = ''

    const menuButton = $('#menu_button')
    const blackFill = $('#black_fill')
    const mainMenu = $('.main_menu')
    const nextButton = $('#next_button')
    const prevButton = $('#prev_button')
    const searchText = $('#search')
    const searchButton = $('#searchButton')
    const pagination = $('.pagination')
    const paginationBox = $('.pagination_box')

    searchButton.click(function(){
        currentPage = 1
        movieSearchText = searchText.attr("value")
        setMovieBox(movieSearchText)
    })

    searchText.keydown(function(e){
        if(e.keyCode === 13){
            currentPage = 1
            movieSearchText = searchText.attr("value")
            setMovieBox(movieSearchText)
        }
    })
    
    menuButton.click(function(){
        $('.menu_box').show()
        blackFill.show()
    })
    blackFill.click(function(){
        blackFill.hide()
        $('.menu_box').hide()
    })
    mainMenu.click(function(){
        blackFill.hide()
        $('.menu_box').hide()
    })

    nextButton.click(function(){
        currentPage++
        setMovieBox(movieSearchText)
    })

    prevButton.click(function(){
        currentPage--
        setMovieBox(movieSearchText)
    })

    $('#slider').slick({
        arrows: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 10000,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false               
              }
            }
        ]
    })


    function setMovieBox(text){
        $('.movie_box').empty()
        $.get('http://www.omdbapi.com/?apikey=8b47da7b&s=' + text +'&page=' + currentPage,function(data){
        if(data.Response == "True"){
            let movies = data.Search
            movies.forEach(function(item) {
    
                addMovieItem(item)
            }); 
            paginationBox.show()
            paginationSet(data.totalResults)
        }else if(data.Response == "False"){
            $('.movie_box').append('<h2 id="error">Sorry, there are no results for your request.</h2>')
            pagination.hide()
        }
    })
    }

    function addMovieItem(item){
        let img
        if(item.Poster == "N/A"){
            img = '<img src="./src/images/no-image.png" alt="'+item.Title+'">'
        }
        else{
            img = '<img src="' + item.Poster + '" alt="'+item.Title+'">'
        }
        
        let movieTitle =  '<h2 class="title">'+ item.Title +'</h2>'
        let typeOfMovie = '<p class="type">'+item.Type+'</p>'
        let year = '<p class="year">'+item.Year+'</p>'
    
        let movieInfo = '<div class="movie_info">'+typeOfMovie+year+'</div>'
        let itemBox = '<div class="movie_item">'+ img + movieTitle + movieInfo +'</div>'
        
        $('.movie_box').append(itemBox)
    }
    
    function paginationSet(totalResults){
        if(currentPage === 1){
            prevButton.prop("disabled", true);
        }else{
            prevButton.prop("disabled", false);
        }
        if(Math.ceil(totalResults/10) === currentPage || totalResults < 11){
            nextButton.prop("disabled", true);
        }else{
            nextButton.prop("disabled", false);
        }

        let from = currentPage * 10 - 9;
        let to = currentPage * 10;
        if(to>totalResults){
            to = totalResults
        }
        $('.pages_count').html(from + '-' + to + ' from ' + totalResults);
    }
})






