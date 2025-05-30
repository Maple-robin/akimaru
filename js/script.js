// js/script.js

// DOMContentLoadedは、HTMLの読み込みが完了したときに実行されます。
// これがないと、HTML要素がまだ存在しない状態でJavaScriptがそれらを操作しようとしてエラーになる可能性があります。
document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの要素を取得
    const hamburger = document.querySelector('.hamburger-menu');
    const spMenu = document.querySelector('.sp-menu');

    // ハンバーガーアイコンがクリックされた時の処理
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('is-active'); // ハンバーガーアイコンの形を切り替える
        spMenu.classList.toggle('is-active');    // メニュー本体の表示/非表示を切り替える

        // メニューが開いたときにbodyにスクロール禁止クラスを追加（オプション）
        // body.classList.toggle('no-scroll');
    });

    // メニュー項目をクリックしたらメニューを閉じる（オプション）
    // これにより、メニューを開いて項目を選択した後に自動的にメニューが閉じます。
    const spMenuItems = document.querySelectorAll('.sp-menu__list a');
    spMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('is-active'); // ハンバーガーアイコンを元の形に戻す
            spMenu.classList.remove('is-active');    // メニューを非表示にする
            // body.classList.remove('no-scroll'); // スクロール禁止を解除（オプション）
        });
    });
});


// メインビジュアルのSwiper初期化
new Swiper('.mySwiperHero', {
    loop: true, // 無限ループ
    autoplay: {
        delay: 5000, // 5秒ごとにスライド
        disableOnInteraction: false, // ユーザー操作後も自動再生を継続
    },
    pagination: { // ドットナビゲーション
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: { // 矢印ボタン
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// 商品一覧のSwiper初期化
new Swiper('.mySwiperProducts', {
    // スマホ設定（767pxまで）
    slidesPerView: 'auto', // CSSで幅を制御するため'auto'に設定
    spaceBetween: 20, // スライド間の余白
    freeMode: true, // フリックで自由にスクロール

    // 矢印ボタンとドットナビゲーション（スマホ/PC共通）
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // PC設定（768px以上）
    breakpoints: {
        768: {
            slidesPerView: 3, // PCでは3枚表示
            spaceBetween: 30, // スライド間の余白
            freeMode: false, // PCではフリックを無効に
            loop: true, // ここでループを有効にする
            // loopedSlides: 3, // オプション: slidesPerViewと同じ値を設定すると、よりスムーズなループになることがあります。
        }
    }
});