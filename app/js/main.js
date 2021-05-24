//выполняет сначало все что в функции
$(function(){


    var mixer = mixitup('.products__inner-box');

    $('.product-slider__inner').slick({
        dots:true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false
    })

});

