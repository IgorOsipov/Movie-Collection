$(document).ready(function(){
    const menuButton = $('#menu_button')
    const blackFill = $('#black_fill')
    const mainMenu = $('.main_menu')
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
})