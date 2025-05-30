// js/script.js

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger-menu');
    const spMenu = document.querySelector('.sp-menu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('is-active');
        spMenu.classList.toggle('is-active');
    });

    const spMenuItems = document.querySelectorAll('.sp-menu__list a');
    spMenuItems.forEach(item => {
        item.addEventListener('click', function () {
            hamburger.classList.remove('is-active');
            spMenu.classList.remove('is-active');
        });
    });

    // メインビジュアルのSwiper初期化
    new Swiper('.mySwiperHero', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: { // ドットナビゲーションは残す
            el: '.swiper-pagination',
            clickable: true,
        },
        // navigation: { // 矢印ボタンは削除
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        // },
    });

    // 商品一覧のSwiper初期化
    new Swiper('.mySwiperProducts', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        freeMode: true,

        // 矢印ボタンは削除
        // navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        // },
        pagination: { // ドットナビゲーションは残す
            el: '.swiper-pagination',
            clickable: true,
        },

        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
                freeMode: false,
            }
        }
    });
});