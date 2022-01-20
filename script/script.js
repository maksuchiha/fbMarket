'use strict'

const faqItems = document.querySelector('.faq__items')
const burger = document.querySelector('.header-burger')
const burgerClose = document.querySelector('.header-burger_close')
const mobMenu = document.querySelector('.header-mob')
const mobMenuLinks = document.querySelector('.header-nav__list_mob')
const marketplaceCounts = document.querySelectorAll('.marketplace-stat__count')
const worksVideo = $('.h-works-info__slide video')
const worksItem = $('.h-works-info__head')
let currentSlide = 0


$(document).ready(function(){
    if (window.screen.width > 606) {
        $('.supported-brands__wr').slick({
            slidesToShow: 7,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1000,
            cssEase: 'linear',
            draggable: true,
            pauseOnHover: true,
            pauseOnDotsHover: true,
        });
    }

    $('.h-works-info__list').click((event) => {
        const target = event.target;

        let indexClick;
        let srcVideo;

        if(target.closest('.h-works-info__head') && !$(target.closest('.h-works-info__head')).hasClass('active')) {
            const activeWorksItem = $('.h-works-info__head.active');

            worksItem.each((index, item) => {

                if(item === target.closest('.h-works-info__head')) {
                    currentSlide = index;
                    indexClick = index;
                    srcVideo = $(item).data('src-video');
                    activeWorksItem.toggleClass('active');
                    $(item).toggleClass('active')
                }
            })

            worksVideo.attr('src', srcVideo);
        }
    })

    const nextSlide = () => {
        const infoList = document.querySelectorAll('.h-works-info__head')

        $(".h-works-info__slide video").bind("ended", function() {
            infoList[currentSlide].classList.toggle('active')
            currentSlide++

            if (currentSlide >= infoList.length) {
                currentSlide = 0
            }

            infoList[currentSlide].classList.toggle('active')

            worksVideo.attr('src', `${infoList[currentSlide].getAttribute('data-src-video')}`);
        });
    }

    nextSlide()

    function initVideo() {
        const activeWorksItem = $('.h-works-info__head.active');
        worksVideo.attr('src', activeWorksItem.data('src-video'));
    }

    initVideo();
});

const removeMobMenu = () => {
    mobMenu.classList.remove('header-mob_active')
    document.body.classList.remove('overflow')
    document.querySelector('.html').classList.remove('overflow')
}

const animates = () => {
    let isFalse = true

    const animate = ({timing, draw, duration}) => {

        let start = performance.now()

        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration
            if (timeFraction > 1) timeFraction = 1

            let progress = timing(timeFraction)

            draw(progress)

            if (timeFraction < 1) {
                requestAnimationFrame(animate)
            }
        });
    }

    const animateNums = () => {
        marketplaceCounts.forEach((item, index) => {
            animate({
                duration: 1000,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    if (index === 0) {
                        item.textContent = `${Math.ceil(progress * 3229250)}+`
                    } else if (index === 1) {
                        item.textContent = `${Math.ceil(progress * 259700)}+`
                    } else if (index === 2) {
                        item.textContent = `${Math.ceil(progress * 10235)}`
                    }
                }
            })
        })
        isFalse = false
    }
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 2734 && isFalse === true) {
            animateNums()
        }
    })
}

const movieToSection = (element) => {
    const menuLinks = document.querySelector(`.${element}`)
    const howWorks = document.getElementById('h-works')
    const pricing = document.getElementById('pricing')
    const solutions = document.getElementById('solutions')
    const faq = document.getElementById('faq')

    menuLinks.addEventListener('click', (e) => {
        e.preventDefault()
        if (e.target.closest('.how-works')) {
            $('body,html').animate({scrollTop: howWorks.offsetTop - 50}, 500)
        } else if (e.target.closest('.Pricing')) {
            $('body,html').animate({scrollTop: pricing.offsetTop}, 500)
        } else if (e.target.closest('.solutions')) {
            $('body,html').animate({scrollTop: solutions.offsetTop - 200}, 500)
        } else if (e.target.closest('.FAQ')) {
            $('body,html').animate({scrollTop: faq.offsetTop}, 500)
        }
    })
}


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
    document.body.classList.add('overflow')
    document.querySelector('.html').classList.add('overflow')
})

burgerClose.addEventListener('click', removeMobMenu)

mobMenuLinks.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.closest('.header-nav__list_mob .header-nav__link')) {
        removeMobMenu()
    }
})


movieToSection('header-nav__list')
movieToSection('header-nav__list_mob')
animates()