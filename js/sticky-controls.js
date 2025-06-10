document.addEventListener('DOMContentLoaded', function () {
    var controls = document.querySelector('.controls-section');
    if (!controls) return;

    var header = document.querySelector('.header');
    var headerHeight = header ? header.offsetHeight : 90;
    var controlsOffset = controls.getBoundingClientRect().top + window.pageYOffset;
    var ranking = document.querySelector('.ranking-container');
    var controlsHeight = controls.offsetHeight;
    var extraSpace = 30; // 余白(px)

    function updateSticky() {
        // ハンバーガーメニューが開いているときはstickyを解除
        if (document.body.classList.contains('menu-open')) {
            controls.classList.remove('sticky-fixed');
            if (ranking) ranking.style.marginTop = '';
            return;
        }

        if (window.pageYOffset > controlsOffset - headerHeight) {
            controls.classList.add('sticky-fixed');
            if (ranking) {
                ranking.style.marginTop = (controlsHeight + extraSpace) + 'px';
            }
        } else {
            controls.classList.remove('sticky-fixed');
            if (ranking) {
                ranking.style.marginTop = '';
            }
        }
    }

    window.addEventListener('scroll', updateSticky);
    window.addEventListener('resize', function () {
        controlsOffset = controls.getBoundingClientRect().top + window.pageYOffset;
        controlsHeight = controls.offsetHeight;
        updateSticky();
    });

    // ハンバーガーメニューの開閉時にもsticky判定を再実行
    const observer = new MutationObserver(updateSticky);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    updateSticky(); // 初期化
});