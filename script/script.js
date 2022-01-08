'use strict'

const faqItems = document.querySelector('.faq__items')
const burger = document.querySelector('.header-burger')
const burgerClose = document.querySelector('.header-burger_close')
const mobMenu = document.querySelector('.header-mob')


faqItems.addEventListener('click', (e) => {
    if (e.target.closest('.faq__title')) {
        e.target.closest('.faq__item')
            .querySelector('.faq__text')
            .classList.toggle('faq__text_active')
        e.target.closest('.faq__item')
            .querySelector('.faq__plus')
            .classList.toggle('faq__plus_active')
    }
})

burger.addEventListener('click', () => {
    mobMenu.classList.add('header-mob_active')
    document.body.style.overflow = 'hidden'
})

burgerClose.addEventListener('click', () => {
    mobMenu.classList.remove('header-mob_active')
    document.body.style.overflow = 'auto'
})

$(document).ready(function(){
    if (window.screen.width > 606) {
        $('.supported-brands__wr').slick({
            slidesToShow: 7,
            slidesToScroll: 2,
            speed: 8000,
            autoplay: true,
            autoplaySpeed: 0,
            cssEase: 'linear',
        });
    }

    const worksVideo = $('.h-works-info__slide video');
    const worksItem = $('.h-works-info__head');

    $('.h-works-info__list').click((event) => {
        const target = event.target;

        let indexClick;
        let srcVideo;

        if(target.closest('.h-works-info__head') && !$(target.closest('.h-works-info__head')).hasClass('active')) {
            const activeWorksItem = $('.h-works-info__head.active');

            worksItem.each((index, item) => {
                if(item == target.closest('.h-works-info__head')) {
                    indexClick = index;
                    srcVideo = $(item).data('src-video');
                    activeWorksItem.toggleClass('active');
                    $(item).toggleClass('active')
                }
            })

            worksVideo.attr('src', srcVideo);
        }
    })

    function initVideo() {
        const activeWorksItem = $('.h-works-info__head.active');
        worksVideo.attr('src', activeWorksItem.data('src-video'));
    }

    initVideo();
});

