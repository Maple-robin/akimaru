document.addEventListener('DOMContentLoaded', function () {
    console.log('日本酒ガイドページが読み込まれました');

    // Swiperの初期化
    new Swiper('.beginner-sake-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
    });
});